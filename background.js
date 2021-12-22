
let color = '#616161';

chrome.runtime.onInstalled.addListener(() => {
    // access chrome storage and set color value
    chrome.storage.sync.set({ color });
    console.log(`background color is set to ${color}`);
});