// When popup window is opened
window.addEventListener('load', checkState);
function checkState() {
    // Fetch toggle state from storage
    chrome.storage.sync.get(['toggleState'], function (result) {
        if (result.toggleState === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ toggleState: 'on' });
        } else if (result.toggleState === 'on') {
            toggleBtn.src = '../images/power-button-on.svg';
        } else {
            toggleBtn.src = '../images/power-button-off.svg';
        }
    });
}

// When toggle button is clicked
const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', toggleClick);
function toggleClick() {
    // Fetch toggle state from storage
    chrome.storage.sync.get(['toggleState'], function (result) {
        // Toggle extension state on or off and update storage key
        if (result.toggleState === 'on') {
            toggleBtn.src = '../images/power-button-off.svg';
            chrome.storage.sync.set({ toggleState: 'off' });
            reloadBtn.style.display = 'block';
        } else {
            toggleBtn.src = '../images/power-button-on.svg';
            chrome.storage.sync.set({ toggleState: 'on' });
            reloadBtn.style.display = 'none';
        }
    });
}

// When reload button is clicked
const reloadBtn = document.getElementById('reloadBtn');
reloadBtn.addEventListener('click', reloadClick);
function reloadClick() {
    // Find active tab and reload it
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
    window.close();
}