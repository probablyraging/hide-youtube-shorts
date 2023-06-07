// On initial install or on extension update, set the state of
// the extension, the toggle buttons in popup.js, and reload any
// active YouTube tabs
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({
            presentModal: true,
            toggleState: true,
            toggleNavState: true,
            toggleHomeFeedState: true,
            toggleSubscriptionFeedState: true,
            toggleTrendingFeedState: true,
            toggleSearchState: true,
            toggleRecommendedState: true,
            toggleTabState: true,
            toggleHomeTabState: true,
            toggleTurboState: false,
            toggleRegularState: true,
            toggleNotificationState: true,
            toggleEmptySpaceState: true,
        }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
        chrome.action.setBadgeBackgroundColor({ color: '#ed5a64' });
        chrome.action.setBadgeText({ text: '1' });
    }
    if (details.reason === 'update') {
        // Check for missing states when the extension is updated. This
        // occurrs when a new state is added between versions
        const keys = [
            'toggleState',
            'toggleNavState',
            'toggleHomeFeedState',
            'toggleSubscriptionFeedState',
            'toggleTrendingFeedState',
            'toggleSearchState',
            'toggleRecommendedState',
            'toggleTabState',
            'toggleHomeTabState',
            'toggleTurboState',
            'toggleRegularState',
            'toggleNotificationState',
            'toggleEmptySpaceState'
        ];
        const states = await chrome.storage.sync.get(keys);
        for (const key of keys) {
            if (!(key in states) || states[key] === undefined) {
                await chrome.storage.sync.set({ [key]: true });
            }
        }
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
        chrome.storage.sync.set({ presentModal: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.action.setBadgeBackgroundColor({ color: '#ed5a64' });
        chrome.action.setBadgeText({ text: '1' });
    }
});

// Handle sending messages from popup.js to main.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message).catch(() => { });
        });
    });
});