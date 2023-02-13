// On initial install or on extension update, set the state of
// the extension and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({ themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleNavState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleHomeFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTrendingFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleSearchState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleNotificationState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleHomeTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTurboState: 'off' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});