function checkStates() {
    // Get extension toggle states from chrome storage
    return chrome.storage.sync.get([
        'toggleState',
        'toggleNavState',
        'toggleHomeFeedState',
        'toggleSubscriptionFeedState',
        'toggleTrendingFeedState',
        'toggleSearchState',
        'toggleRecommendedState',
        'toggleTabState',
        'toggleNotificationState',
        'toggleHomeTabState',
        'toggleTurboState'
    ]);
}

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
    const { toggleState } = await chrome.storage.sync.get(['toggleState']);
    chrome.storage.sync.get([key], result => {
        if (result[key] === undefined) {
            // Update toggle state in storage
            chrome.storage.sync.set({ [key]: true }).catch(() => { console.log(`[STORAGE] Could not set storage item for ${key}`) });
        } else if (result[key] && toggleState) {
            button.classList.add('toggled');
        } else if (!result[key]) {
            button.classList.remove('toggled');
        }
    });
}

/**
 * Shows or hides the reload button depending on whether the switch states hav changed
 * @param {Object} staticSwitchStates The initial switch states
 * @param {Object} updatedSwitchStates The updated switch states
 */
async function showReloadButton(staticSwitchStatess, updatedSwitchStates) {
    const activeTabs = await chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] });
    if (activeTabs.length < 1) return;
    const reloadBtn = document.getElementById('reloadBtn');
    const newSwitchStates = await checkStates();
    if ((JSON.stringify(newSwitchStates) !== JSON.stringify(updatedSwitchStates)) !== JSON.stringify(staticSwitchStatess)) {
        reloadBtn.style.display = 'block'
    }
    if (JSON.stringify(newSwitchStates) === JSON.stringify(staticSwitchStatess)) {
        reloadBtn.style.display = 'none'
    }
}

/**
 * Toggles the state of the switch when it is clicked
 * @param {string} key The key for the storage item
 * @param {HTMLElement} button The element to be manipulated
 */
function onToggleSwitchClick(key, button, staticSwitchStatess, updatedSwitchStates) {
    chrome.storage.sync.get([key], async result => {
        if (result[key]) {
            button.classList.remove('toggled');
            await chrome.storage.sync.set({ [key]: false }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            showReloadButton(staticSwitchStatess, updatedSwitchStates)
        } else if (!result[key]) {
            button.classList.add('toggled');
            await chrome.storage.sync.set({ [key]: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            showReloadButton(staticSwitchStatess, updatedSwitchStates)
        }
    });
    chrome.runtime.sendMessage({ checkStates: true });
}

/**
 * Check the states of switches as they're updated
 * @returns {Object} The updated switch states
 */
async function updatedSwitchStates() {
    return await checkStates();
}

/**
 * Displays a modal to the user
 */
async function presentModal() {
    const { modalVersion } = await chrome.storage.sync.get(['modalVersion']);
    const initialModal = document.querySelector('#initialModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalContent = document.querySelector('.modal-content');
    // Check if the remote modal version changed and show a modal if it has
    fetch('../views/modal.html')
        .then(res => res.text())
        .then(html => {
            modalContent.innerHTML = html;
            const modalHeader = document.querySelector('.modal-header');
            const version = modalHeader.getAttribute('update');
            const modalFooter = document.querySelector('.modal-footer');
            const modalCloseBtn = document.querySelector('.btn-close');
            if (!modalVersion || modalVersion == version) {
                const delay = 250;
                modalCloseBtn.addEventListener('click', async () => {
                    $(modalBackdrop).animate({ opacity: 0, }, delay).promise().then(function () { $(this).css('z-index', '-1'); });
                    $(initialModal).animate({ opacity: 0, }, delay).promise().then(function () { $(this).hide(); });
                });
                modalFooter.addEventListener('click', async () => {
                    $(modalBackdrop).animate({ opacity: 0, }, delay).promise().then(function () { $(this).css('z-index', '-1'); });
                    $(initialModal).animate({ opacity: 0, }, delay).promise().then(function () { $(this).hide(); });
                });
                setTimeout(() => {
                    $(initialModal).css('display', 'block');
                    $(initialModal).animate({ opacity: 1, }, delay);
                    $(modalBackdrop).animate({ opacity: 0.65, }, delay).css('z-index', '1');
                }, 500);
                // Update the local modal version
                chrome.storage.sync.set({ modalVersion: version });
                chrome.action.setBadgeText({ text: '' });
            }
        }).catch(error => {
            console.error('Error fetching modal.html: ', error);
        });
}

// Theme key pairs
let themes;
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we need to present a new modal
    presentModal();
    // Set current static switch states to use in onToggleSwitchStates function
    const staticSwitchStates = await checkStates();
    // Power button
    const toggleBtn = document.getElementById('power-btn');
    const reloadBtn = document.getElementById('reloadBtn');
    // Switch container elements
    const toggleButtons = [
        toggleNavButton = document.querySelector('.nav-toggle'),
        toggleHomeFeedButton = document.querySelector('.homefeed-toggle'),
        toggleSubscriptionFeedButton = document.querySelector('.subscriptionfeed-toggle'),
        toggleTrendingFeedButton = document.querySelector('.trendingfeed-toggle'),
        toggleSearchButton = document.querySelector('.search-toggle'),
        toggleRecommendedButton = document.querySelector('.recommended-toggle'),
        toggleTabButton = document.querySelector('.tab-toggle'),
        toggleNotificationButton = document.querySelector('.notification-toggle'),
        toggleHomeTabButton = document.querySelector('.hometab-toggle'),
        toggleTurboButton = document.querySelector('.turbo-toggle')
    ];
    // State switch elements
    const toggleContainers = [
        toggleNavContainer = document.querySelector('.nav-container'),
        toggleHomeFeedContainer = document.querySelector('.homefeed-container'),
        toggleSubscriptionFeedContainer = document.querySelector('.subscriptionfeed-container'),
        toggleTrendingFeedContainer = document.querySelector('.trendingfeed-container'),
        toggleSearchContainer = document.querySelector('.search-container'),
        toggleRecommendedContainer = document.querySelector('.recommended-container'),
        toggleTabContainer = document.querySelector('.tab-container'),
        toggleNotificationContainer = document.querySelector('.notification-container'),
        toggleHomeTabContainer = document.querySelector('.hometab-container'),
        toggleTurboContainer = document.querySelector('.turbo-container')
    ];
    // Storage key names
    const storageKeys = [
        'toggleNavState',
        'toggleHomeFeedState',
        'toggleSubscriptionFeedState',
        'toggleTrendingFeedState',
        'toggleSearchState',
        'toggleRecommendedState',
        'toggleTabState',
        'toggleNotificationState',
        'toggleHomeTabState',
        'toggleTurboState'
    ];
    // Theme key pairs
    themes = {
        'luxury': '<b style="color: #ffff9f;">Luxury</b>Dark',
        'enigma': '<b style="color: #53b4e8;">Enigma</b>Dark',
        'scarlet': '<b style="color: #9b2234;">Scarlet</b>Dark',
        'azure': '<b style="color: #53b4e8;">Azure</b>Light',
        'blossom': '<b style="color: #ef9fcf;">Blossom</b>Light',
        'eden': '<b style="color: #6fb95f;">Eden</b>Light'
    };

    // When popup window is opened, check the toggle state and update the UI accordingly
    chrome.storage.sync.get(['toggleState'], async ({ toggleState }) => {
        // Set the logo based on the current theme
        const { themeIndex } = await chrome.storage.sync.get(['themeIndex']);
        const themeKey = Object.keys(themes)
        document.getElementById('logo').src = `../assets/logo-${themeKey[themeIndex]}.svg`;
        // Update storage values and button states based on the main toggle state
        if (toggleState === undefined) {
            chrome.storage.sync.set({ toggleState: true, themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
            toggleButtons.forEach(button => {
                button.classList.add('toggled');
            });
        } else if (toggleState) {
            toggleBtn.classList.add('hoverable');
            toggleButtonStates(toggleButtons, 1);
        } else if (!toggleState) {
            toggleBtn.src = '../assets/power-button-off.svg';
            toggleBtn.classList.remove('hoverable');
            toggleButtonStates(toggleButtons, 2);
            toggleContainerStates(toggleContainers, 2);
        }
        // When the power button is clicked, toggle the extension state and update the storage key
        toggleBtn.addEventListener('click', async () => {
            const { themeIndex } = await chrome.storage.sync.get('themeIndex');
            chrome.storage.sync.get('toggleState', ({ toggleState }) => {
                const toggleStateToSet = !toggleState;
                const iconPath = toggleStateToSet
                    ? `/icons/icon48-${Object.keys(themes)[themeIndex]}.png`
                    : '/icons/icon48_disabled.png';
                toggleBtn.src = toggleStateToSet
                    ? `../assets/power-button-on-${themeIndex}.svg`
                    : '../assets/power-button-off.svg';
                reloadBtn.style.display = toggleStateToSet
                    ? 'none'
                    : 'block';
                chrome.action.setIcon({ path: { "48": iconPath } }).catch(() => { });
                chrome.runtime.sendMessage({ checkStates: true });
                toggleBtn.classList.toggle('hoverable', toggleStateToSet);
                chrome.storage.sync.set({ toggleState: toggleStateToSet }).catch(() => { console.log('[STORAGE] Could not set storage item') });
                toggleButtonStates(...toggleStateToSet ? [toggleButtons, 3] : [toggleButtons, 2]);
                toggleContainerStates(...toggleStateToSet ? [toggleContainers, 1] : [toggleContainers, 2]);
                toggleButtons.forEach((button, index) => {
                    setStorageValues(storageKeys[index], button);
                });
            });
        });
        // When the popup window is opened, check the toggle state of each button and update the UI accordingly
        toggleButtons.forEach((button, index) => {
            setStorageValues(storageKeys[index], button);
        });
        // When a toggle switch is clicked, update the relevant key and element state
        toggleContainers.forEach((container, index) => {
            container.addEventListener('click', async () => {
                console.log(storageKeys[index], toggleButtons[index]);
                onToggleSwitchClick(storageKeys[index], toggleButtons[index], staticSwitchStates, await updatedSwitchStates());
            });
        });
    });
    // Set the theme
    chrome.storage.sync.get(['themeIndex'], async function (result) {
        const { toggleState } = await chrome.storage.sync.get(['toggleState']);
        const themeKey = Object.keys(themes);
        const themeValue = Object.values(themes);
        if (toggleState) chrome.action.setIcon({ path: { "48": `/icons/icon48-${themeKey[result.themeIndex]}.png` } }).catch(() => { });
        document.body.classList.add(themeKey[result.themeIndex]);
        if (toggleState) document.getElementById('power-btn').src = `../assets/power-button-on-${result.themeIndex}.svg`;
        document.getElementById('current-color').innerHTML = themeValue[result.themeIndex];
    });
    // When reload button is clicked, find the active tab and reload it
    reloadBtn.addEventListener('click', () => {
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
        window.close();
    });
});

// Handle theme stepper
const handleColorChange = async (increment) => {
    const { toggleState } = await chrome.storage.sync.get(['toggleState']);
    const themeKey = Object.keys(themes);
    const themeValue = Object.values(themes);
    // Get the current theme index and color
    let { themeIndex } = await chrome.storage.sync.get(['themeIndex']);
    let currentColor;
    document.body.classList.forEach(color => {
        currentColor = color;
    });
    // Update the current index by adding inc to it and keeping it within the range of theme keys
    themeIndex = (themeIndex + increment + themeKey.length) % themeKey.length;
    // If the toggle state is not 'off', update the badge icon and power button
    if (toggleState) {
        chrome.action.setIcon({ path: { "48": `/icons/icon48-${themeKey[themeIndex]}.png` } }).catch(() => { });
        document.getElementById('power-btn').src = `../assets/power-button-on-${themeIndex}.svg`;
    }
    // Apply the relevant classes
    document.body.classList.remove(currentColor);
    document.body.classList.add(themeKey[themeIndex]);
    document.getElementById('current-color').innerHTML = themeValue[themeIndex];
    document.getElementById('logo').src = `../assets/logo-${themeKey[themeIndex]}.svg`;
    // Set the new theme color in storage
    chrome.storage.sync.set({ themeColor: themeKey[themeIndex], themeIndex: themeIndex }).catch(() => { console.log('[STORAGE] Could not set storage item') });
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
        // Show or hide the group element
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