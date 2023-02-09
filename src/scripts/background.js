// On initial install, set the state of the extension
// and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({ toggleState: 'on' });
        chrome.storage.sync.set({ toggleNavState: 'on' });
        chrome.storage.sync.set({ toggleHomeFeedState: 'on' });
        chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' });
        chrome.storage.sync.set({ toggleTabState: 'on' });
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});