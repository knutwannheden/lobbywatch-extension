chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ "enabled": true });
});

// TODO check if we somehow can add an
// const observer = new MutationObserver(function () {
//     console.log('callback that runs when observer is triggered');
// });

chrome.commands.onCommand.addListener(async (command) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (command === 'show-next') {
        chrome.tabs.sendMessage(tab.id, { action: 'select-next' });
    } else if (command === 'show-previous') {
        chrome.tabs.sendMessage(tab.id, { action: 'select-previous' });
    }
});

chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.storage.local.get("enabled", ({ enabled }) => {
        if (enabled) {
            inject(details.tabId, true);
        }
    });
});

// chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
//     console.log('dom loaded');
//     chrome.storage.local.get("enabled", ({ enabled }) => {
//         if (enabled) {
//             inject(details.tabId, true);
//         }
//     });
// });

// chrome.webNavigation.onTabReplaced.addListener((details) => {
//     console.log('tab replaced');
//     chrome.storage.local.get("enabled", ({ enabled }) => {
//         if (enabled) {
//             inject(details.tabId, true);
//         }
//     });
// });

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.storage.local.get("enabled", ({ enabled }) => {
        if (enabled) {
            inject(details.tabId, true);
        }
    });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.local.get("enabled", ({ enabled }) => {
        inject(activeInfo.tabId, enabled);
    });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'toggle') {
        chrome.storage.local.get("enabled", async ({ enabled }) => {
            chrome.action.setIcon({ "path": (enabled ? 'images/lw16gray.png' : 'images/lobbywatch16.png') });
            chrome.storage.local.set({ "enabled": !enabled });
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab)
                inject(tab.id, !enabled);
            sendResponse(true);
        });
    }
});

function inject(tabId, enabled) {
    chrome.scripting.getRegisteredContentScripts({ ids: ['lobbywatch-highlighting'] }, registered => {
        if (enabled) {
            chrome.action.setBadgeText({ text: '' });

            if (registered.length === 0) {
                // install script
                chrome.scripting.registerContentScripts([{
                    id: 'lobbywatch-highlighting',
                    js: ['content-script.js', 'popper.min.js', 'tippy-bundle.umd.min.js'],
                    css: ['content-script.css', 'tippy.css'],
                    matches: ['<all_urls>'],
                    runAt: 'document_idle'
                }],
                    () => {
                        addHighlighting(tabId);
                    });
            } else {
                addHighlighting(tabId);
            }
        } else {
            if (registered.length > 0) {
                chrome.scripting.unregisterContentScripts({ ids: ['lobbywatch-highlighting'] });
            }
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: removeHighlighting,
            });
            chrome.action.setBadgeText({ text: 'OFF' });
        }
    });
}

function addHighlighting(tabId) {
    setTimeout(function () {
        chrome.tabs.sendMessage(tabId, { action: 'match' }, async (response) => {
            if (response) {
                let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab && tab.id === tabId)
                    chrome.action.setBadgeText({ text: response.toString() });
            }
        });
    }, 1000);
}

function removeHighlighting() {
    let elements = Array.from(document.getElementsByClassName('lw-person'));
    elements.forEach(e => { e.classList.remove('lw-person'); e.classList.remove('lw-selected'); e.classList.remove('lw-parliamentarian'); e.classList.remove('lw-lobbyist'); })
    chrome.runtime.sendMessage({ event: "matched", data: [] });
}
