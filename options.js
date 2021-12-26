let closeTabs = null;
const checkBox = document.querySelector('#closeTabs');
const btnCloseTabs = document.querySelector('#saveSetIndex');
const setIndex = document.querySelector('#setIndex');
const page = document.querySelector('#options');
const notification = document.querySelector('#notification');

chrome.storage.sync.get("closeTabsAfterCopy", ({ closeTabsAfterCopy }) => {
    checkBox.checked = closeTabsAfterCopy;
    closeTabs = closeTabsAfterCopy;
    console.log(`closeTabs = ${closeTabs}`);
});

checkBox.addEventListener('click', (e) => {
    let closeTabsAfterCopy = e.target.checked;
    chrome.storage.sync.set({ closeTabsAfterCopy })
});

btnCloseTabs.addEventListener('click', () => {

    if (setIndex.value) {
        let copyFromIndex = Number(setIndex.value)
        chrome.storage.sync.set({ copyFromIndex });
        setIndex.value = '';
        showNotification(copyFromIndex)
        console.log(`new index saved: ${copyFromIndex}`);
        setTimeout(() => { hideNotification() }, 3000)
    } else {
        alert('You must enter a value under Setting Index')
    }
});

showNotification = (index) => {
    let message = `New Index is set to ${index}`;
    console.log(`show notification just recieved this index... ${index}`);
    notification.innerHTML = message;
}

hideNotification = () => {
    notification.innerHTML = '';
}