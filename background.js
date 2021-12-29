
chrome.runtime.onInstalled.addListener(() => {
    // access chrome storage and set default values
    chrome.storage.sync.set({
        color: '#616161',
        copyFromIndex: 3,
        closeTabsAfterCopy: true,
        copyUrlsAndTitles: true,
        copyUrlsAndTitles_message: 'Current sttings: Copy both Titles & URLs',
        copyUrls: false,
        copyUrls_message: 'Current sttings: Copy just the URLs',
        copyTitles: false,
        copyTitles_message: 'Current sttings: Copy just the Titles'
    });
});