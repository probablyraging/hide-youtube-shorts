// On initial install or on extension update, set the state of
// the extension and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({
            themeIndex: 0,
            toggleState: true,
            toggleNavState: true,
            toggleHomeFeedState: true,
            toggleSubscriptionFeedState: true,
            toggleTrendingFeedState: true,
            toggleSearchState: true,
            toggleTabState: true,
            toggleNotificationState: true,
            toggleHomeTabState: true,
            toggleTurboState: false
        }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});