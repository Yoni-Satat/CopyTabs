let copyTabs = document.getElementById("copyTabs");
let i = 0;
let closeTabs = null;
const pipe = '|';

chrome.storage.sync.get(["copyFromIndex", "closeTabsAfterCopy", "color"],
    ({ copyFromIndex, closeTabsAfterCopy, color }) => {
        i = copyFromIndex;
        closeTabs = closeTabsAfterCopy;
        copyTabs.style.backgroundColor = color;
    });


// add click event listener that will:
// trigger a loop through all open tabs and get urls & titles
copyTabs.addEventListener('click', () => {

    let copy = '';

    // query chrome for current window only and get array of all tabs
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        let title = '';
        // skip first 3 tabs
        for (let index = i; index < tabs.length; index++) {
            // get title
            title = tabs[index].title;
            // check if title inclueds a pipe
            if (title.includes(pipe)) {
                // if it does, remove the pipe and everything after the pipe
                title = title.substring(0, title.indexOf('|'));
            } else {
                title = title;
            }

            // concat title + url with line break at the end
            copy = copy.concat(`${title} ${tabs[index].url}\n`)
            // TODO: add condition based on closeTabsAfterCopy
            if (closeTabs) {
                chrome.tabs.remove(tabs[index].id, () => {
                    console.log(`tab id ${tabs[index].id} closed...`);
                });
            }
        };
        // copy all titles and urls to clipboard
        navigator.clipboard.writeText(copy);
    });
});