let copyTabs = document.getElementById("copyTabs");

// color the button from chrome storage
chrome.storage.sync.get("color", ({ color }) => {
    copyTabs.style.backgroundColor = color;
});

// add click event listener that will:
// trigger a loop through all open tabs and get url's & h1's
copyTabs.addEventListener('click', () => {

    let copy = '';

    // query chrome for current window only and get array of all tabs
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let title = '';
        // skip first 3 tabs
        for (let index = 3; index < tabs.length; index++) {
            // get title
            title = tabs[index].title;
            // cut out the pipe | plus everything after it
            title = title.substring(0, title.indexOf('|'));
            // concat title + url with line break at the end
            copy = copy.concat(`${title} ${tabs[index].url}\n`)
            // TODO: close each tab after copy its values
            chrome.tabs.remove(tabs[index].id, () => {
                console.log(`tab id ${tabs[index].id} closed...`);
            })
        };
        // copy all titles and urls to clipboard
        navigator.clipboard.writeText(copy);
    });
});