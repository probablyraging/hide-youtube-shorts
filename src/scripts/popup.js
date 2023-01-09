document.addEventListener('DOMContentLoaded', () => {
    const hasRefreshed = false;

    // Toggle main button
    const toggleBtn = document.getElementById('toggleBtn');
    const reloadBtn = document.getElementById('reloadBtn');
    const toggleNavContainer = document.querySelector('.nav-container');
    const toggleNavButton = document.querySelector('.nav-toggle');
    const toggleHomeFeedContainer = document.querySelector('.homefeed-container');
    const toggleHomeFeedButton = document.querySelector('.homefeed-toggle');
    const toggleTabContainer = document.querySelector('.tab-container');
    const toggleTabButton = document.querySelector('.tab-toggle');

    // When popup window is opened, check the toggle state and update the UI accordingly
    chrome.storage.sync.get(['toggleState'], mainResult => {
        if (mainResult.toggleState === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ toggleState: 'on' });
            toggleNavButton.classList.add('toggled');
            toggleHomeFeedButton.classList.add('toggled');
            toggleTabButton.classList.add('toggled');
        } else if (mainResult.toggleState === 'on') {
            toggleBtn.src = '../images/power-button-on.svg';
            toggleNavButton.classList.add('toggled');
            toggleHomeFeedButton.classList.add('toggled');
            toggleTabButton.classList.add('toggled');
        } else {
            toggleBtn.src = '../images/power-button-off.svg';
            toggleNavButton.classList.remove('toggled');
            toggleNavButton.disabled = true;
            toggleNavContainer.style.pointerEvents = "none";
            toggleHomeFeedButton.classList.remove('toggled');
            toggleHomeFeedButton.disabled = true;
            toggleHomeFeedContainer.style.pointerEvents = "none";
            toggleTabButton.classList.remove('toggled');
            toggleTabButton.disabled = true;
            toggleTabContainer.style.pointerEvents = "none";
        }

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleBtn.addEventListener('click', () => {
            chrome.storage.sync.get(['toggleState'], result => {
                if (result.toggleState === 'on') {
                    toggleBtn.src = '../images/power-button-off.svg';
                    chrome.storage.sync.set({ toggleState: 'off' });
                    toggleNavButton.classList.remove('toggled');
                    toggleNavButton.disabled = true;
                    toggleNavContainer.style.pointerEvents = "none";
                    toggleHomeFeedButton.classList.remove('toggled');
                    toggleHomeFeedButton.disabled = true;
                    toggleHomeFeedContainer.style.pointerEvents = "none";
                    toggleTabButton.classList.remove('toggled');
                    toggleTabButton.disabled = true;
                    toggleTabContainer.style.pointerEvents = "none";
                    reloadBtn.style.display = 'block';
                } else {
                    toggleBtn.src = '../images/power-button-on.svg';
                    chrome.storage.sync.set({ toggleState: 'on' });
                    toggleNavButton.disabled = false;
                    toggleNavContainer.style.pointerEvents = "auto";
                    toggleHomeFeedButton.disabled = false;
                    toggleHomeFeedContainer.style.pointerEvents = "auto";
                    toggleTabButton.disabled = false;
                    toggleTabContainer.style.pointerEvents = "auto";
                    chrome.storage.sync.get(['toggleNavState'], result => {
                        if (result.toggleNavState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleNavState: 'on' });
                        } else if (result.toggleNavState === 'on') {
                            toggleNavButton.classList.add('toggled');
                        } else {
                            toggleNavButton.classList.remove('toggled');
                        }
                    });
                    chrome.storage.sync.get(['toggleHomeFeedState'], result => {
                        if (result.toggleHomeFeedState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleHomeFeedState: 'on' });
                        } else if (result.toggleHomeFeedState === 'on') {
                            toggleHomeFeedButton.classList.add('toggled');
                        } else {
                            toggleHomeFeedButton.classList.remove('toggled');
                        }
                    });
                    chrome.storage.sync.get(['toggleTabState'], result => {
                        if (result.toggleTabState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleTabState: 'on' });
                        } else if (result.toggleTabState === 'on') {
                            toggleTabButton.classList.add('toggled');
                        } else {
                            toggleTabButton.classList.remove('toggled');
                        }
                    });
                    reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle nav hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleNavState'], result => {
            if (result.toggleNavState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleNavState: 'on' });
            } else if (result.toggleNavState === 'on' && mainResult.toggleState === 'on') {
                toggleNavButton.classList.add('toggled');
            } else {
                toggleNavButton.classList.remove('toggled');
            }
        });

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleNavContainer.addEventListener('click', () => {
            chrome.storage.sync.get(['toggleNavState'], result => {
                if (result.toggleNavState === 'on') {
                    toggleNavButton.classList.remove('toggled');
                    chrome.storage.sync.set({ toggleNavState: 'off' });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleNavButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleNavState: 'on' });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle home feed hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleHomeFeedState'], result => {
            if (result.toggleHomeFeedState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleHomeFeedState: 'on' });
            } else if (result.toggleHomeFeedState === 'on' && mainResult.toggleState === 'on') {
                toggleHomeFeedButton.classList.add('toggled');
            } else {
                toggleHomeFeedButton.classList.remove('toggled');
            }
        });

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleHomeFeedContainer.addEventListener('click', () => {
            chrome.storage.sync.get(['toggleHomeFeedState'], result => {
                if (result.toggleHomeFeedState === 'on') {
                    toggleHomeFeedButton.classList.remove('toggled');
                    chrome.storage.sync.set({ toggleHomeFeedState: 'off' });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleHomeFeedButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleHomeFeedState: 'on' });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle channel tab hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleTabState'], result => {
            if (result.toggleTabState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleTabState: 'on' });
            } else if (result.toggleTabState === 'on' && mainResult.toggleState === 'on') {
                toggleTabButton.classList.add('toggled');
            } else {
                toggleTabButton.classList.remove('toggled');
            }
        });

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleTabContainer.addEventListener('click', () => {
            chrome.storage.sync.get(['toggleTabState'], result => {
                if (result.toggleTabState === 'on') {
                    toggleTabButton.classList.remove('toggled');
                    chrome.storage.sync.set({ toggleTabState: 'off' });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleTabButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleTabState: 'on' });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
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