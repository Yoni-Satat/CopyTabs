let copyTabs = document.querySelector("#copyTabs");
let errMessage = document.querySelector('#errMessage');
let copyBothUrlsAndTitles = null;
let copyJustUrls = null;
let copyJustTitles = null;
let i = null;
let closeTabs = null;
const pipe = '|';
let numberOfTabsToCopy = null;

chrome.storage.sync.get([
    "copyFromIndex",
    "closeTabsAfterCopy",
    "color",
    "copyUrlsAndTitles",
    "copyUrls",
    "copyTitles"
],
    ({ copyFromIndex, closeTabsAfterCopy, color, copyUrlsAndTitles, copyUrls, copyTitles }) => {
        i = copyFromIndex;
        closeTabs = closeTabsAfterCopy;
        copyTabs.style.backgroundColor = color;
        copyBothUrlsAndTitles = copyUrlsAndTitles;
        copyJustUrls = copyUrls;
        copyJustTitles = copyTitles;
    });

chrome.tabs.query({ currentWindow: true }, (tabs) => {
    console.log(`Copy Urls & Titles: ${copyBothUrlsAndTitles}`);
    console.log(`Copy Urls only: ${copyJustUrls}`);
    console.log(`Copy Titles only: ${copyJustTitles}`);
    numberOfTabsToCopy = tabs.length - i;
    if (numberOfTabsToCopy > 0) {
        copyTabs.innerHTML = `Copy ${numberOfTabsToCopy} Tabs(s)`
    } else {
        copyTabs.innerHTML = `No Tabs to Copy`;
    }
});

// loop through all open tabs and get urls & titles
copyTabs.addEventListener('click', () => {
    // query chrome for current window only and get array of all tabs
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (copyBothUrlsAndTitles) {
            copyBoth(tabs, i);
        } else if (copyJustUrls) {
            copyUrlsOnly(tabs, i);
        } else {
            copyTitlesOnly(tabs, i);
        }
    });
});

copyBoth = (tabs, i) => {
    let copy = '';
    let title = '';
    let url = '';
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
}

copyUrlsOnly = (tabs, i) => {
    let copy = '';
    let url = '';
    for (let index = i; index < tabs.length; index++) {
        // get url
        url = tabs[index].url;

        // concat urls with line break at the end
        copy = copy.concat(`${url}\n\n`)

        if (closeTabs) {
            chrome.tabs.remove(tabs[index].id, () => {
            });
        }
    };
    // copy all titles and urls to clipboard
    navigator.clipboard.writeText(copy);
}

copyTitlesOnly = (tabs, i) => {
    let copy = '';
    let title = '';
    for (let index = i; index < tabs.length; index++) {
        // get titles
        title = tabs[index].title;
        // check if title inclueds a pipe
        if (title.includes(pipe)) {
            // if it does, remove the pipe and everything after the pipe
            title = title.substring(0, title.indexOf('|'));
        } else {
            title = title;
        }

        // concat title + url with line break at the end
        copy = copy.concat(`${title}\n\n`)

        if (closeTabs) {
            chrome.tabs.remove(tabs[index].id, () => {
            });
        }
    };
    // copy all titles and urls to clipboard
    navigator.clipboard.writeText(copy);
}

