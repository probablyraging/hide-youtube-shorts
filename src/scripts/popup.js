document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
    const reloadBtn = document.getElementById('reloadBtn');

    // When popup window is opened, check the toggle state and update the UI accordingly
    chrome.storage.sync.get(['toggleState'], result => {
        if (result.toggleState === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ toggleState: 'on' });
        } else if (result.toggleState === 'on') {
            toggleBtn.src = '../images/power-button-on.svg';
        } else {
            toggleBtn.src = '../images/power-button-off.svg';
            reloadBtn.style.display = 'block';
        }
    });

    // When toggle button is clicked, toggle the extension state and update the storage key
    toggleBtn.addEventListener('click', () => {
        chrome.storage.sync.get(['toggleState'], result => {
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
    });

    // When reload button is clicked, find the active tab and reload it
    reloadBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        });
        window.close();
    });
});