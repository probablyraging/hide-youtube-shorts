/**
 * Toggles the state of the switch based on the state value passed in
 * @param {Array} buttons An array of elements to be manipulated
 * @param {Number} state The state to set the elements to
 */
function toggleButtonStates(buttons, state) {
    if (state === 1) buttons.forEach(button => {
        button.classList.add('toggled');
    });
    if (state === 2) buttons.forEach(button => {
        button.classList.remove('toggled');
        button.disabled = true;
    });
    if (state === 3) buttons.forEach(button => {
        button.disabled = false;
    });
}

/**
 * Toggles the state of the switch containers
 * @param {Array} containers An array of elements to be manipulated
 * @param {Number} state The state to set the elements to
 */
function toggleContainerStates(containers, state) {
    if (state === 1) containers.forEach(container => {
        container.style.pointerEvents = "auto";
    });
    if (state === 2) containers.forEach(container => {
        container.style.pointerEvents = "none";
    });
}

/**
 * Set the storage values for the given `key` in `chrome.storage.sync`. If the
 * storage item does not exist, it will be created with the value of 'on'
 * @param {string} key The key for the storage item
 * @param {HTMLElement} button The element to be manipulated
 */
async function setStorageValues(key, button) {
    const power = (await chrome.storage.sync.get(['toggleState'])).toggleState;
    chrome.storage.sync.get([key], result => {
        if (result[key] === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ [key]: 'on' }).catch(() => { console.log(`[STORAGE] Could not set storage item for ${key}`) });
        } else if (result[key] === 'on' && power === 'on') {
            button.classList.add('toggled');
        } else if (result[key] === 'off') {
            button.classList.remove('toggled');
        }
    });
}

/**
 * Toggles the state of the switch when it is clicked
 * @param {string} key The key for the storage item
 * @param {HTMLElement} button The element to be manipulated
 * @param {Boolean} hasRefreshed A variable representing the refresh state of the DOM
 */
function onToggleSwitchClick(key, button, hasRefreshed) {
    const reloadBtn = document.getElementById('reloadBtn');
    chrome.storage.sync.get([key], result => {
        if (result[key] === 'on') {
            button.classList.remove('toggled');
            chrome.storage.sync.set({ [key]: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            reloadBtn.style.display = 'block';
        } else if (result[key] === 'off') {
            button.classList.add('toggled');
            chrome.storage.sync.set({ [key]: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            reloadBtn.style.display = 'block';
            if (hasRefreshed) reloadBtn.style.display = 'none';
        }
    });
}

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
    // Power button
    const toggleBtn = document.getElementById('power-btn');
    const reloadBtn = document.getElementById('reloadBtn');
    // Toggle buttons
    const toggleNavButton = document.querySelector('.nav-toggle');
    const toggleHomeFeedButton = document.querySelector('.homefeed-toggle');
    const toggleSubscriptionFeedButton = document.querySelector('.subscriptionfeed-toggle');
    const toggleTrendingFeedButton = document.querySelector('.trendingfeed-toggle');
    const toggleSearchButton = document.querySelector('.search-toggle');
    const toggleTabButton = document.querySelector('.tab-toggle');
    const toggleNotificationButton = document.querySelector('.notification-toggle');
    const toggleHomeTabButton = document.querySelector('.hometab-toggle');
    const toggleTurboButton = document.querySelector('.turbo-toggle');
    // Button containers
    const toggleNavContainer = document.querySelector('.nav-container');
    const toggleHomeFeedContainer = document.querySelector('.homefeed-container');
    const toggleSubscriptionFeedContainer = document.querySelector('.subscriptionfeed-container');
    const toggleTrendingFeedContainer = document.querySelector('.trendingfeed-container');
    const toggleSearchContainer = document.querySelector('.search-container');
    const toggleTabContainer = document.querySelector('.tab-container');
    const toggleNotificationContainer = document.querySelector('.notification-container');
    const toggleHomeTabContainer = document.querySelector('.hometab-container');
    const toggleTurboContainer = document.querySelector('.turbo-container');
    // Array of selector elements
    const toggleButtons = [toggleNavButton, toggleHomeFeedButton, toggleSubscriptionFeedButton, toggleTrendingFeedButton, toggleSearchButton, toggleTabButton, toggleNotificationButton, toggleHomeTabButton, toggleTurboButton];
    const toggleContainers = [toggleNavContainer, toggleHomeFeedContainer, toggleSubscriptionFeedContainer, toggleTrendingFeedContainer, toggleSearchContainer, toggleTabContainer, toggleNotificationContainer, toggleHomeTabContainer, toggleTurboContainer];
    const storageKeys = ['toggleNavState', 'toggleHomeFeedState', 'toggleSubscriptionFeedState', 'toggleTrendingFeedState', 'toggleSearchState', 'toggleTabState', 'toggleNotificationState', 'toggleHomeTabState', 'toggleTurboState'];

    // When popup window is opened, check the toggle state and update the UI accordingly
    chrome.storage.sync.get(['toggleState'], mainResult => {
        // Update storage values and button states based on the main toggle state
        if (mainResult.toggleState === undefined) {
            chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            chrome.storage.sync.set({ themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            toggleButtons.forEach(button => {
                button.classList.add('toggled');
            });
        } else if (mainResult.toggleState === 'on') {
            toggleBtn.classList.add('hoverable');
            toggleButtonStates(toggleButtons, 1);
        } else if (mainResult.toggleState === 'off') {
            toggleBtn.src = '../assets/power-button-off.svg';
            toggleBtn.classList.remove('hoverable');

            toggleButtonStates(toggleButtons, 2);
            toggleContainerStates(toggleContainers, 2);
        }

        // When the power button is clicked, toggle the extension state and update the storage key
        toggleBtn.addEventListener('click', async () => {
            // Theme values
            const themeIndex = (await chrome.storage.sync.get(['themeIndex'])).themeIndex;
            const themeKey = Object.keys(themes);
            chrome.storage.sync.get(['toggleState'], result => {
                if (result.toggleState === 'on') {
                    chrome.action.setIcon({ path: { "48": '/icons/icon48_disabled.png' } }).catch(() => { });
                    toggleBtn.src = '../assets/power-button-off.svg';
                    toggleBtn.classList.remove('hoverable');
                    chrome.storage.sync.set({ toggleState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'block';
                    toggleButtonStates(toggleButtons, 2);
                    toggleContainerStates(toggleContainers, 2);
                } else if (result.toggleState === 'off') {
                    chrome.action.setIcon({ path: { "48": `/icons/icon48-${themeKey[themeIndex]}.png` } }).catch(() => { });
                    toggleBtn.src = `../assets/power-button-on-${themeIndex}.svg`;
                    toggleBtn.classList.add('hoverable');
                    chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                    reloadBtn.style.display = 'none';
                    toggleButtonStates(toggleButtons, 3);
                    toggleContainerStates(toggleContainers, 1);
                    toggleButtons.forEach((button, index) => {
                        setStorageValues(storageKeys[index], button);
                    });
                }
            });
        });

        // When popup window is opened, check the toggle state of each button and update the UI accordingly
        toggleButtons.forEach((button, index) => {
            setStorageValues(storageKeys[index], button);
        });

        // When a toggle switch is clicked, update the relevant key and element state
        toggleContainers.forEach((container, index) => {
            container.addEventListener('click', () => {
                onToggleSwitchClick(storageKeys[index], toggleButtons[index], hasRefreshed);
            });
        });
    });

    // Set the theme
    chrome.storage.sync.get(['themeIndex'], async function (result) {
        const toggleState = (await chrome.storage.sync.get(['toggleState'])).toggleState;
        const themeKey = Object.keys(themes);
        const themeValue = Object.values(themes);
        if (toggleState !== 'off') chrome.action.setIcon({ path: { "48": `/icons/icon48-${themeKey[result.themeIndex]}.png` } }).catch(() => { });
        document.body.classList.add(themeKey[result.themeIndex]);
        if (toggleState !== 'off') document.getElementById('power-btn').src = `../assets/power-button-on-${result.themeIndex}.svg`;
        console.log(document.getElementById('current-color'));
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

// Handle theme stepper
const handleColorChange = async (increment) => {
    const toggleState = (await chrome.storage.sync.get(['toggleState'])).toggleState;
    const themeKey = Object.keys(themes);
    const themeValue = Object.values(themes);
    // Get the current theme index and color
    let currentIndex = (await chrome.storage.sync.get(['themeIndex'])).themeIndex;
    let currentColor;
    document.body.classList.forEach(color => {
        currentColor = color;
    });
    // Update the current index by adding inc to it and keeping it within the range of theme keys
    currentIndex = (currentIndex + increment + themeKey.length) % themeKey.length;
    // If the toggle state is not 'off', update the badge icon and power button
    if (toggleState !== 'off') {
        chrome.action.setIcon({ path: { "48": `/icons/icon48-${themeKey[currentIndex]}.png` } }).catch(() => { });
        document.getElementById('power-btn').src = `../assets/power-button-on-${currentIndex}.svg`;
    }
    // Apply the relevant classes
    document.body.classList.remove(currentColor);
    document.body.classList.add(themeKey[currentIndex]);
    document.getElementById('current-color').innerHTML = themeValue[currentIndex];
    // Set the new theme color in storage
    chrome.storage.sync.set({ themeColor: themeKey[currentIndex] }).catch(() => { console.log('[STORAGE] Could not set storage item') });
    chrome.storage.sync.set({ themeIndex: currentIndex }).catch(() => { console.log('[STORAGE] Could not set storage item') });
}
document.getElementById('color-next').addEventListener('click', () => handleColorChange(1));
document.getElementById('color-previous').addEventListener('click', () => handleColorChange(-1));

// Handle the collapsible settings menu
const collapsibles = Array.from(document.querySelectorAll('#collapsible'));
collapsibles.forEach(collapsible => {
    collapsible.addEventListener("click", function () {
        // Make sure only one settings group can be uncollapsed at a time
        const openElements = document.querySelectorAll('.slidDown');
        openElements.forEach(openElement => {
            const caret = openElement.querySelector('i');
            $(caret).animate({ "rotate": "0deg" }, 200);
            $(openElement.nextElementSibling).slideUp();
            $(openElement).toggleClass('slidDown');
        });
        // Get the next element after the header, this is the body of the group
        const element = collapsible.nextElementSibling;
        const elementStyle = element.style.display;
        if (!elementStyle || elementStyle === 'none') {
            const caret = collapsible.querySelector('i');
            $(caret).animate({ "rotate": "180deg" }, 200);
            $(collapsible.nextElementSibling).slideDown();
            $(collapsible).toggleClass('slidDown');
        } else {
            const caret = collapsible.querySelector('i');
            $(caret).animate({ "rotate": "0deg" }, 200);
            $(collapsible.nextElementSibling).slideUp();
            $(collapsible).toggleClass('slidDown');
        }
    });
});

// Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))