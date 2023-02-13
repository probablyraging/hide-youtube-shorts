// On initial install or on extension update, set the state of
// the extension and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({ themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleNavState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleHomeFeedState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleSubscriptionFeedState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTrendingFeedState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleSearchState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTabState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleNotificationState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleHomeTabState: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTurboState: false }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});