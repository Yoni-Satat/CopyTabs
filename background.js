
let color = '#616161';
let copyFromIndex = 3;
let closeTabsAfterCopy = true;

chrome.runtime.onInstalled.addListener(() => {
    // access chrome storage and set color value
    chrome.storage.sync.set({ color, copyFromIndex, closeTabsAfterCopy });
    console.log(`background color: ${color}\ncopyFromIndex: ${copyFromIndex}\ncloseTabsAfterCopy: ${closeTabsAfterCopy}`);
});