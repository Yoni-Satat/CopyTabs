let copyTabs = document.querySelector("#copyTabs");
let errMessage = document.querySelector('#errMessage');
let i = null;
let closeTabs = null;
const pipe = '|';
let numberOfTabsToCopy = null;

chrome.storage.sync.get(["copyFromIndex", "closeTabsAfterCopy", "color"],
    ({ copyFromIndex, closeTabsAfterCopy, color }) => {
        i = copyFromIndex;
        closeTabs = closeTabsAfterCopy;
        copyTabs.style.backgroundColor = color;
    });

chrome.tabs.query({ currentWindow: true }, (tabs) => {
    console.log(`numberOfTabsToCopy: ${numberOfTabsToCopy}\ni: ${i}`);
    numberOfTabsToCopy = tabs.length - i;
    if (numberOfTabsToCopy > 0) {
        copyTabs.innerHTML = `Copy ${numberOfTabsToCopy} Tabs(s)`
    } else {
        copyTabs.innerHTML = `No Tabs to Copy`;
        // errMessage.innerHTML = `number of tabs to copy is ${numberOfTabsToCopy}, and you are copying from index ${i}`
    }
});

// loop through all open tabs and get urls & titles
copyTabs.addEventListener('click', () => {

    let copy = '';

    // query chrome for current window only and get array of all tabs
    chrome.tabs.query({ currentWindow: true }, (tabs) => {

        let title = '';
        let url = '';
        // start coping from selected index (i)
        for (let index = i; index < tabs.length; index++) {
            // get title & url
            title = tabs[index].title;
            url = tabs[index].url;
            // check if title inclueds a pipe
            if (title.includes(pipe)) {
                // if it does, remove the pipe and everything after the pipe
                title = title.substring(0, title.indexOf('|'));
            } else {
                title = title;
            }

            // concat title + url with line break at the end
            copy = copy.concat(`${title}\n${url}\n`)

            if (closeTabs) {
                chrome.tabs.remove(tabs[index].id, () => {
                });
            }
        };
        // copy all titles and urls to clipboard
        navigator.clipboard.writeText(copy);
    });
});

