console.log("Hello from options.js");

let currentIndex = 3;
let checkBox = document.querySelector('#closeTabs');

chrome.storage.sync.get("closeTabsAfterCopy", ({ closeTabsAfterCopy }) => {
    checkBox.checked = closeTabsAfterCopy;
});