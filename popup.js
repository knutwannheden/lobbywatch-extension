let disable = document.getElementById("disable");

chrome.storage.local.get("enabled", async ({ enabled }) => {
    disable.textContent = enabled === true ? 'ENABLED' : 'DISABLED';
    disable.style.backgroundColor = enabled ? '#74d7ff' : 'grey';
});

disable.addEventListener("click", async () => {
    enabled = disable.textContent === 'ENABLED';
    disable.textContent = enabled ? 'DISABLED' : 'ENABLED';
    disable.style.backgroundColor = enabled ? 'grey' : '#74d7ff';
    chrome.runtime.sendMessage({ action: "toggle" }, () => {
        enabled = disable.textContent === 'ENABLED';
        if (enabled) {
            setTimeout(function () {
                update();
            }, 1100);
        } else {
            let persons = document.getElementById("persons");
            var newNode = document.createElement("ul");
            newNode.id = 'persons';
            persons.parentElement.replaceChild(newNode, persons);
        }
    });
});

function update() {
    chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, { action: "get-details" }, function (response) {
            var newNode = document.createElement("ul");
            newNode.id = 'persons';
            for (var person of response) {
                var item = document.createElement("li");
                var link = document.createElement("a");
                link.href = '#' + person.id;
                link.textContent = person.name;
                link.addEventListener("click", newListener(tab[0].id, person.seqNr));
                item.appendChild(link);
                newNode.appendChild(item);
            }

            let persons = document.getElementById("persons");
            persons.parentElement.replaceChild(newNode, persons);
        });
    });
}

function newListener(tabId, personSeqNr) {
    return () => {
        chrome.tabs.sendMessage(tabId, { action: 'select-person-by-seq-nr', seqNr: personSeqNr });
    }
}

update();