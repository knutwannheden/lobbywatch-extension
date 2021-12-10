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
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: highlightNext,
            args: [1]
        });
    } else if (command === 'show-previous') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: highlightNext,
            args: [-1]
        });
    }
});

function highlightNext(dir) {
    let elements = Array.from(document.getElementsByClassName('lw-person'));
    current = elements.find(e => e.classList.contains('lw-selected'));
    var element = null;
    if (!current) {
        element = elements[0];
    } else {
        element = elements[(elements.indexOf(current) + elements.length + dir) % elements.length];
        // current.classList.toggle('lw-selected');
        while (current !== undefined && current.classList !== undefined) {
            current.classList.remove('lw-selected');
            current = current.parentNode;
        }
    }
    element.classList.add('lw-selected');
    element.scrollIntoViewIfNeeded();

    if (element.offsetParent === null) {
        while (element !== undefined && element.offsetParent === null) {
            element = element.parentNode;
        }
        element.classList.add('lw-selected');
        element.scrollIntoViewIfNeeded();
    }
}

chrome.webNavigation.onCompleted.addListener((details) => {
    console.log('completed');
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
    console.log('history state updated');
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
    if (msg === 'toggle') {
        chrome.storage.local.get("enabled", async ({ enabled }) => {
            chrome.action.setIcon({ "path": (enabled ? 'images/lw16gray.png' : 'images/lobbywatch16.png') });
            chrome.storage.local.set({ "enabled": !enabled });
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab !== undefined)
                inject(tab.id, !enabled);
        });
    }
});

function inject(tabId, enabled) {
    chrome.scripting.getRegisteredContentScripts({ ids: ['lobbywatch-highlighting'] }, registered => {
        if (enabled) {
            chrome.action.setBadgeText({ text: '' });

            if (registered.length === 0 && enabled) {
                // install script
                chrome.scripting.registerContentScripts([{
                    id: 'lobbywatch-highlighting',
                    js: ['content-script.js'],
                    css: ['content-script.css'],
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
        chrome.tabs.sendMessage(tabId, 'match', async (response) => {
            if (response !== undefined) {
                let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab !== undefined && tab.id === tabId)
                    chrome.action.setBadgeText({ text: response.toString() });
            }
        });
    }, 1000);
}

function removeHighlighting() {
    let elements = Array.from(document.getElementsByClassName('lw-person'));
    elements.forEach(e => { e.classList.remove('lw-person'); e.classList.remove('lw-selected'); e.classList.remove('lw-parliamentarian'); e.classList.remove('lw-lobbyist'); })
}
