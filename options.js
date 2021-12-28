let closeTabs = null;
let setIndex_message = document.querySelector('#setIndex_message');
let setItemsToCopy_message = document.querySelector('#setItemsToCopy_message');
let indexFromStorage = null;
const checkBox = document.querySelector('#closeTabs');
const saveSetIndexBtn = document.querySelector('#saveSetIndex');
const setIndex = document.querySelector('#setIndex');
const page = document.querySelector('#options');
const notification = document.querySelector('#notification');
let copyUrlsAndTitlesRadio = document.querySelector('#copyUrlsAndTitles');
let copyUrlsRadio = document.querySelector('#copyUrls');
let copyTitlesRadio = document.querySelector('#copyTitles');

chrome.storage.sync.get([
    "closeTabsAfterCopy",
    "copyFromIndex",
    "copyUrlsAndTitles",
    "copyUrls",
    "copyTitles"
], ({ closeTabsAfterCopy, copyFromIndex, copyUrlsAndTitles, copyUrls, copyTitles }) => {
    checkBox.checked = closeTabsAfterCopy;
    closeTabs = closeTabsAfterCopy;
    copyUrlsAndTitlesRadio.checked = copyUrlsAndTitles;
    copyUrlsRadio.checked = copyUrls;
    copyTitlesRadio.checked = copyTitles;
    indexFromStorage = copyFromIndex;
    setIndex_message.innerHTML = `CopyTabs is currently set to skip the first ${indexFromStorage} tabs.`;
    if (copyUrlsAndTitles) {
        setItemsToCopy_message.innerHTML = 'Current sttings: Copy both Titles & URLs';
    } else if (copyUrls) {
        setItemsToCopy_message.innerHTML = 'Current sttings: Copy just the URLs';
    } else {
        setItemsToCopy_message.innerHTML = 'Current sttings: Copy just the Titles';
    }
});

checkBox.addEventListener('click', (e) => {
    let closeTabsAfterCopy = e.target.checked;
    chrome.storage.sync.set({ closeTabsAfterCopy })
});

saveSetIndexBtn.addEventListener('click', () => {

    if (setIndex.value && setIndex.value >= 0) {
        let copyFromIndex = Number(setIndex.value)
        chrome.storage.sync.set({ copyFromIndex });
        setIndex.value = '';
        setIndex_message.innerHTML = `CopyTabs is currently set to skip the first ${copyFromIndex} tabs.`;
        showNotification(copyFromIndex);
        setTimeout(() => { hideNotification() }, 5000)
    } else {
        alert('You must enter a value that is greater than or equal to 0 \nunder Set new Index')
    }
});

showNotification = (index) => {
    let message = `Successfully saved index ${index}`;
    notification.innerHTML = message;
    notification.style.color = '#4caf50 ';
}

hideNotification = () => {
    notification.innerHTML = '';
}

// handle set items to copy
copyUrlsAndTitles.addEventListener('click', (e) => {
    chrome.storage.sync.set({
        copyUrlsAndTitles: e.target.checked,
        copyUrls: !e.target.value,
        copyTitles: !e.target.value
    });
    setItemsToCopy_message.innerHTML = 'Current sttings: Copy both Titles & URLs';
});

copyTitles.addEventListener('click', (e) => {
    chrome.storage.sync.set({
        copyUrlsAndTitles: !e.target.checked,
        copyUrls: !e.target.value,
        copyTitles: e.target.value
    });
    setItemsToCopy_message.innerHTML = 'Current sttings: Copy just the Titles';
});

copyUrls.addEventListener('click', (e) => {
    chrome.storage.sync.set({
        copyUrlsAndTitles: !e.target.checked,
        copyUrls: e.target.value,
        copyTitles: !e.target.value
    });
    setItemsToCopy_message.innerHTML = 'Current sttings: Copy just the Urls';
});