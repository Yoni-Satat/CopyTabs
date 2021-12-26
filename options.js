let closeTabs = null;
let setIndex_message = document.querySelector('#setIndex_message');
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
    setIndex_message.innerHTML = `CopyTabs is currently set to skip the first ${indexFromStorage} tabs.<br/> Set to 0 to copy all tabs in current window`;
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
        setIndex_message.innerHTML = `CopyTabs is currently set to skip the first ${copyFromIndex} tabs.<br/> Set to 0 to copy all tabs in current window`;
        showNotification(copyFromIndex);
        setTimeout(() => { hideNotification() }, 5000)
    } else {
        alert('You must enter a value under Setting Index \nValue must be greater or equal to 0')
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
});

copyTitles.addEventListener('click', (e) => {
    chrome.storage.sync.set({
        copyUrlsAndTitles: !e.target.checked,
        copyUrls: !e.target.value,
        copyTitles: e.target.value
    });
});

copyUrls.addEventListener('click', (e) => {
    chrome.storage.sync.set({
        copyUrlsAndTitles: !e.target.checked,
        copyUrls: e.target.value,
        copyTitles: !e.target.value
    });
});