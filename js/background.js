// On initial install or on extension update, set the state of
// the extension and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({
            themeIndex: 0,
            showModal: true,
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
            tabs.forEach(tab => {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});

// Used to send messages from popup.js to main.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, message);
        });
    });
});

// Check if the remote modal version changed and set the icon badge if it has
setInterval(() => {
    chrome.storage.sync.get(['modalVersion'], ({ modalVersion }) => {
        fetch('../views/modal.html')
            .then(res => res.text())
            .then(html => {
                const version = html.match(/update="([^"]*)"/)[1];
                if (!modalVersion || modalVersion !== version) {
                    chrome.action.setBadgeBackgroundColor({ color: '#ed5a64' });
                    chrome.action.setBadgeText({ text: '1' });
                }
            }).catch(error => {
                console.error('Error fetching modal.html: ', error);
            });
    });
}, 60 * 60 * 1000);
