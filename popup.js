let disable = document.getElementById("disable");
let persons = document.getElementById("persons");

disable.addEventListener("click", async () => {
    chrome.runtime.sendMessage("toggle");
});

chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, "details", function (response) {
        //assuming that info was html markup then you could do
        var newNode = document.createElement("ul");
        for (var person of response) {
            var item = document.createElement("li");
            item.textContent = person;
            newNode.appendChild(item);
        }

        persons.parentElement.replaceChild(newNode, persons);
        //I personally wouldn't do it like this but you get the idea
    });
});