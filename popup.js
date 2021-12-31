let copyTabs = document.querySelector("#copyTabs");
let errMessage = document.querySelector('#errMessage');
let copyBothUrlsAndTitles = null;
let copyJustUrls = null;
let copyJustTitles = null;
let closeTabs = null;
const pipe = '|';
let i = null;

chrome.storage.sync.get([
    "copyFromIndex",
    "closeTabsAfterCopy",
    "color",
    "copyUrlsAndTitles",
    "copyUrls",
    "copyTitles"
],
    ({
        copyFromIndex,
        closeTabsAfterCopy,
        color,
        copyUrlsAndTitles,
        copyUrls,
        copyTitles
    }) => {
        closeTabs = closeTabsAfterCopy;
        i = copyFromIndex;
        copyTabs.style.backgroundColor = color;
        copyBothUrlsAndTitles = copyUrlsAndTitles;
        copyJustUrls = copyUrls;
        copyJustTitles = copyTitles;
        chrome.tabs.query({ currentWindow: true }, (tabs) => {
            let numberOfTabsToCopy = tabs.length - copyFromIndex;
            numberOfTabsToCopy > 0 ?
                copyTabs.innerHTML = `Copy ${numberOfTabsToCopy} Tabs(s)`
                :
                copyTabs.innerHTML = 'No Tabs to copy';
        });
    });

copyTabs.addEventListener('click', () => {
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
        title = tabs[index].title;
        url = tabs[index].url;
        if (title.includes(pipe)) {
            title = title.substring(0, title.indexOf('|'));
        } else {
            title = title;
        }
        copy = copy.concat(`${title}\n${url}\n`)

        if (closeTabs) {
            chrome.tabs.remove(tabs[index].id, () => {
            });
        }
    };
    navigator.clipboard.writeText(copy);
}

copyUrlsOnly = (tabs, i) => {
    let copy = '';
    let url = '';
    for (let index = i; index < tabs.length; index++) {
        url = tabs[index].url;
        copy = copy.concat(`${url}\n\n`);
        if (closeTabs) {
            chrome.tabs.remove(tabs[index].id, () => {
            });
        }
    };
    navigator.clipboard.writeText(copy);
}

copyTitlesOnly = (tabs, i) => {
    let copy = '';
    let title = '';
    for (let index = i; index < tabs.length; index++) {
        title = tabs[index].title;
        if (title.includes(pipe)) {
            title = title.substring(0, title.indexOf('|'));
        } else {
            title = title;
        }
        copy = copy.concat(`${title}\n\n`)

        if (closeTabs) {
            chrome.tabs.remove(tabs[index].id, () => {
            });
        }
    };
    navigator.clipboard.writeText(copy);
}

