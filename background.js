
chrome.runtime.onInstalled.addListener(() => {
    // access chrome storage and set default values
    chrome.storage.sync.set({
        color: '#616161',
        copyFromIndex: 3,
        closeTabsAfterCopy: true,
        copyUrlsAndTitles: true,
        copyUrls: false,
        copyTitles: false
    });
});