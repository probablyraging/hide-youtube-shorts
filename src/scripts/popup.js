const themes = {
    'luxury': '<b style="color: #ffff9f;">Luxury</b>Dark',
    'enigma': '<b style="color: #53b4e8;">Enigma</b>Dark',
    'scarlet': '<b style="color: #9b2234;">Scarlet</b>Dark',
    'azure': '<b style="color: #53b4e8;">Azure</b>Light',
    'blossom': '<b style="color: #ef9fcf;">Blossom</b>Light',
    'eden': '<b style="color: #6fb95f;">Eden</b>Light'
};

document.addEventListener('DOMContentLoaded', () => {
    const hasRefreshed = false;

    // Toggle main button
    const toggleBtn = document.getElementById('power-btn');
    const reloadBtn = document.getElementById('reloadBtn');
    const toggleNavContainer = document.querySelector('.nav-container');
    const toggleNavButton = document.querySelector('.nav-toggle');
    const toggleHomeFeedContainer = document.querySelector('.homefeed-container');
    const toggleHomeFeedButton = document.querySelector('.homefeed-toggle');
    const toggleSubscriptionFeedContainer = document.querySelector('.subscriptionfeed-container');
    const toggleSubscriptionFeedButton = document.querySelector('.subscriptionfeed-toggle');
    const toggleTabContainer = document.querySelector('.tab-container');
    const toggleTabButton = document.querySelector('.tab-toggle');

    // When popup window is opened, check the toggle state and update the UI accordingly
    chrome.storage.sync.get(['toggleState'], async mainResult => {
        if (mainResult.toggleState === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            chrome.storage.sync.set({ themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            toggleNavButton.classList.add('toggled');
            toggleHomeFeedButton.classList.add('toggled');
            toggleSubscriptionFeedButton.classList.add('toggled');
            toggleTabButton.classList.add('toggled');
        } else if (mainResult.toggleState === 'on') {
            // toggleBtn.src = `../images/power-button-on-${themeIndex}.svg`;
            toggleBtn.classList.add('hoverable');
            toggleNavButton.classList.add('toggled');
            toggleHomeFeedButton.classList.add('toggled');
            toggleSubscriptionFeedButton.classList.add('toggled');
            toggleTabButton.classList.add('toggled');
        } else {
            toggleBtn.src = '../images/power-button-off.svg';
            toggleBtn.classList.remove('hoverable');
            toggleNavButton.classList.remove('toggled');
            toggleNavButton.disabled = true;
            toggleNavContainer.style.pointerEvents = "none";
            toggleHomeFeedButton.classList.remove('toggled');
            toggleHomeFeedButton.disabled = true;
            toggleHomeFeedContainer.style.pointerEvents = "none";
            toggleSubscriptionFeedButton.classList.remove('toggled');
            toggleSubscriptionFeedButton.disabled = true;
            toggleSubscriptionFeedContainer.style.pointerEvents = "none";
            toggleTabButton.classList.remove('toggled');
            toggleTabButton.disabled = true;
            toggleTabContainer.style.pointerEvents = "none";
        }

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleBtn.addEventListener('click', async () => {
            const themeIndex = (await chrome.storage.sync.get(['themeIndex'])).themeIndex;
            const themeKey = Object.keys(themes);
            chrome.storage.sync.get(['toggleState'], result => {
                if (result.toggleState === 'on') {
                    chrome.action.setIcon({ path: { "48": '/icon/icon48_disabled.png' } }).catch(() => {});
                    toggleBtn.src = '../images/power-button-off.svg';
                    toggleBtn.classList.remove('hoverable');
                    chrome.storage.sync.set({ toggleState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    toggleNavButton.classList.remove('toggled');
                    toggleNavButton.disabled = true;
                    toggleNavContainer.style.pointerEvents = "none";
                    toggleHomeFeedButton.classList.remove('toggled');
                    toggleHomeFeedButton.disabled = true;
                    toggleHomeFeedContainer.style.pointerEvents = "none";
                    toggleSubscriptionFeedButton.classList.remove('toggled');
                    toggleSubscriptionFeedButton.disabled = true;
                    toggleSubscriptionFeedContainer.style.pointerEvents = "none";
                    toggleTabButton.classList.remove('toggled');
                    toggleTabButton.disabled = true;
                    toggleTabContainer.style.pointerEvents = "none";
                    reloadBtn.style.display = 'block';
                } else {
                    chrome.action.setIcon({ path: { "48": `/icon/icon48-${themeKey[themeIndex]}.png` } }).catch(() => {});
                    toggleBtn.src = `../images/power-button-on-${themeIndex}.svg`;
                    toggleBtn.classList.add('hoverable');
                    chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    toggleNavButton.disabled = false;
                    toggleNavContainer.style.pointerEvents = "auto";
                    toggleHomeFeedButton.disabled = false;
                    toggleHomeFeedContainer.style.pointerEvents = "auto";
                    toggleSubscriptionFeedButton.disabled = false;
                    toggleSubscriptionFeedContainer.style.pointerEvents = "auto";
                    toggleTabButton.disabled = false;
                    toggleTabContainer.style.pointerEvents = "auto";
                    chrome.storage.sync.get(['toggleNavState'], result => {
                        if (result.toggleNavState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleNavState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                        } else if (result.toggleNavState === 'on') {
                            toggleNavButton.classList.add('toggled');
                        } else {
                            toggleNavButton.classList.remove('toggled');
                        }
                    });
                    chrome.storage.sync.get(['toggleHomeFeedState'], result => {
                        if (result.toggleHomeFeedState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleHomeFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                        } else if (result.toggleHomeFeedState === 'on') {
                            toggleHomeFeedButton.classList.add('toggled');
                        } else {
                            toggleHomeFeedButton.classList.remove('toggled');
                        }
                    });
                    chrome.storage.sync.get(['toggleSubscriptionFeedState'], result => {
                        if (result.toggleSubscriptionFeedState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                        } else if (result.toggleSubscriptionFeedState === 'on') {
                            toggleSubscriptionFeedButton.classList.add('toggled');
                        } else {
                            toggleSubscriptionFeedButton.classList.remove('toggled');
                        }
                    });
                    chrome.storage.sync.get(['toggleTabState'], result => {
                        if (result.toggleTabState === undefined) {
                            // Update toggle state in storage
                            chrome.storage.sync.set({ toggleTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
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
                chrome.storage.sync.set({ toggleNavState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
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
                    chrome.storage.sync.set({ toggleNavState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleNavButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleNavState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle home feed hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleHomeFeedState'], result => {
            if (result.toggleHomeFeedState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleHomeFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
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
                    chrome.storage.sync.set({ toggleHomeFeedState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleHomeFeedButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleHomeFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle subscription feed hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleSubscriptionFeedState'], result => {
            if (result.toggleSubscriptionFeedState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            } else if (result.toggleSubscriptionFeedState === 'on' && mainResult.toggleState === 'on') {
                toggleSubscriptionFeedButton.classList.add('toggled');
            } else {
                toggleSubscriptionFeedButton.classList.remove('toggled');
            }
        });

        // When toggle button is clicked, toggle the extension state and update the storage key
        toggleSubscriptionFeedContainer.addEventListener('click', () => {
            chrome.storage.sync.get(['toggleSubscriptionFeedState'], result => {
                if (result.toggleSubscriptionFeedState === 'on') {
                    toggleSubscriptionFeedButton.classList.remove('toggled');
                    chrome.storage.sync.set({ toggleSubscriptionFeedState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleSubscriptionFeedButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });

        // Toggle channel tab hiding
        // When popup window is opened, check the toggle state and update the UI accordingly
        chrome.storage.sync.get(['toggleTabState'], result => {
            if (result.toggleTabState === undefined) {
                // Update toggle state in storage
                chrome.storage.sync.set({ toggleTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
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
                    chrome.storage.sync.set({ toggleTabState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'block';
                } else {
                    toggleTabButton.classList.add('toggled');
                    chrome.storage.sync.set({ toggleTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    if (hasRefreshed) reloadBtn.style.display = 'none';
                }
            });
        });
    });

    // Set the theme
    chrome.storage.sync.get(['themeIndex'], async function (result) {
        const toggleState = (await chrome.storage.sync.get(['toggleState'])).toggleState;
        const themeKey = Object.keys(themes);
        const themeValue = Object.values(themes);
        if (toggleState !== 'off') chrome.action.setIcon({ path: { "48": `/icon/icon48-${themeKey[result.themeIndex]}.png` } }).catch(() => {});
        document.body.classList.add(themeKey[result.themeIndex]);
        if (toggleState !== 'off') document.getElementById('power-btn').src = `../images/power-button-on-${result.themeIndex}.svg`;
        document.getElementById('current-color').innerHTML = themeValue[result.themeIndex];
    });

    // When reload button is clicked, find the active tab and reload it
    reloadBtn.addEventListener('click', () => {
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
        window.close();
    });
});


document.getElementById('color-next').addEventListener('click', async function () {
    const toggleState = (await chrome.storage.sync.get(['toggleState'])).toggleState;
    const themeKey = Object.keys(themes);
    const themeValue = Object.values(themes);
    let currentIndex = (await chrome.storage.sync.get(['themeIndex'])).themeIndex;

    // Get the current color
    let currentColor;
    document.body.classList.forEach(color => {
        currentColor = color;
    });

    // Increment the index
    if (currentIndex >= themeKey.length - 1) currentIndex = -1;
    currentIndex++;

    // Remove other color choices
    if (toggleState !== 'off') chrome.action.setIcon({ path: { "48": `/icon/icon48-${themeKey[currentIndex]}.png` } }).catch(() => {}).catch(() => {});
    document.body.classList.remove(currentColor);
    document.body.classList.add(themeKey[currentIndex]);
    document.getElementById('current-color').innerHTML = themeValue[currentIndex];
    if (toggleState !== 'off') document.getElementById('power-btn').src = `../images/power-button-on-${currentIndex}.svg`;
    chrome.storage.sync.set({ themeColor: themeKey[currentIndex] }).catch(() => { console.log('[STORAGE] Could not set storage item') });
    chrome.storage.sync.set({ themeIndex: currentIndex }).catch(() => { console.log('[STORAGE] Could not set storage item') });
});


document.getElementById('color-previous').addEventListener('click', async function () {
    const toggleState = (await chrome.storage.sync.get(['toggleState'])).toggleState;
    const themeKey = Object.keys(themes);
    const themeValue = Object.values(themes);
    let currentIndex = (await chrome.storage.sync.get(['themeIndex'])).themeIndex;

    // Get the current color
    let currentColor;
    document.body.classList.forEach(color => {
        currentColor = color;
    });

    // Decrement the index
    if (currentIndex <= 0) currentIndex = themeKey.length;
    currentIndex--;

    // Remove other color choices
    if (toggleState !== 'off') chrome.action.setIcon({ path: { "48": `/icon/icon48-${themeKey[currentIndex]}.png` } }).catch(() => {});
    document.body.classList.remove(currentColor);
    document.body.classList.add(themeKey[currentIndex]);
    document.getElementById('current-color').innerHTML = themeValue[currentIndex];
    if (toggleState !== 'off') document.getElementById('power-btn').src = `../images/power-button-on-${currentIndex}.svg`;
    chrome.storage.sync.set({ themeColor: themeKey[currentIndex] }).catch(() => { console.log('[STORAGE] Could not set storage item') });
    chrome.storage.sync.set({ themeIndex: currentIndex }).catch(() => { console.log('[STORAGE] Could not set storage item') });
});