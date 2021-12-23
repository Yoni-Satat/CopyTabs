console.log("Hello from options.js");

let closeTabs = null;
let currentIndex = 3;
let checkBox = document.querySelector('#closeTabs');

chrome.storage.sync.get("closeTabsAfterCopy", ({ closeTabsAfterCopy }) => {
    checkBox.checked = closeTabsAfterCopy;
    closeTabs = closeTabsAfterCopy;
    console.log(`closeTabs = ${closeTabs}`);
});

checkBox.addEventListener('click', (e) => {
    let closeTabsAfterCopy = e.target.checked;
    chrome.storage.sync.set({ closeTabsAfterCopy })
});