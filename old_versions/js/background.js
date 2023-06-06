// On initial install or on extension update, set the state of
// the extension, the toggle buttons in popup.js, and reload any
// active YouTube tabs
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        chrome.storage.sync.set({
            themeIndex: 0,
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
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
        chrome.storage.sync.set({ presentModal: false }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.action.setBadgeBackgroundColor({ color: '#ed5a64' });
        chrome.action.setBadgeText({ text: '' });
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