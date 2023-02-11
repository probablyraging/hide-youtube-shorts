// On initial install or on extension update, set the state of
// the extension and the toggle buttons in popup.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        chrome.storage.sync.set({ themeIndex: 0 }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleNavState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleHomeFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleSubscriptionFeedState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.storage.sync.set({ toggleTabState: 'on' }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.tabs.query({ url: "https://www.youtube.com/*" }, function (tabs) {
            tabs.forEach(function (tab) {
                chrome.tabs.reload(tab.id);
            });
        });
    }
});

// Execute the script on target tabs as soon as the tab's status
// is "loading". This allows the script to be ran immediately and
// unsures functions are only ran once
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url?.includes("https://www.youtube.com/") && changeInfo.status === 'loading') {
        console.log(changeInfo);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: hideShorts
        });
    }
});

function hideShorts() {
    // Check for shorts videos and tabs every 100 milliseconds
    const int = setInterval(() => {
        // If the extension is unloaded or updated, reload the page to terminate orphaned scripts
        if (!chrome.runtime.id) {
            clearInterval(int);
            return location.reload();
        }
        // Check chrome storage to get extension states
        chrome.storage.sync.get(['toggleState'], function (result) {
            if (result.toggleState === 'on') {
                // Nav menu
                chrome.storage.sync.get(['toggleNavState'], function (result) {
                    if (result.toggleNavState === 'on') hideShortsNavButton();
                });
                // Home feed
                chrome.storage.sync.get(['toggleHomeFeedState'], function (result) {
                    if (result.toggleHomeFeedState === 'on') hideShortsShelfHomeFeed(), hideShortsVideosHomeFeed()
                });
                // Subscriptions feed
                chrome.storage.sync.get(['toggleSubscriptionFeedState'], function (result) {
                    if (result.toggleSubscriptionFeedState === 'on') hideShortsVideosSubscriptionFeed();
                });
                // Channel tab
                chrome.storage.sync.get(['toggleTabState'], function (result) {
                    if (result.toggleTabState === 'on') hideShortsTabOnChannel();
                });
            }
        });
    }, 500);

    // Hide the shorts button in the navigation menu
    function hideShortsNavButton() {
        const elements = document.querySelectorAll('#endpoint[title="Shorts"]');
        elements.forEach(element => {
            const parent = element.parentNode;
            parent.parentNode.removeChild(parent);
        });
    }

    // Hide the shorts shelf in the home/subscriptions feed
    function hideShortsShelfHomeFeed() {
        if (document.title.toLowerCase() === 'youtube' || document.title.toLowerCase() === 'subscriptions - youtube') {
            const elements = document.querySelectorAll('.style-scope ytd-rich-shelf-renderer');
            elements.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.removeChild(parent);
            });
        }
    }

    // Hide shorts video elements in the home/subscription feeds
    function hideShortsVideosHomeFeed() {
        if (document.title.toLowerCase() == 'youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                if (parent.hasAttribute('rich-grid-thumbnail')) parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }

    // Hide shorts video elements in the home/subscription feeds
    function hideShortsVideosSubscriptionFeed() {
        if (document.title.toLowerCase() == 'subscriptions - youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                // When the subscription feed is being viewed in gride view
                if (parent.parentNode.parentNode.parentNode.parentNode.nodeName === 'YTD-GRID-VIDEO-RENDERER')
                    parent.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                // When the subscription feed is being viewed in list view
                if (parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'YTD-EXPANDED-SHELF-CONTENTS-RENDERER')
                    parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            });
        }
    }

    // Hide the shorts tab on the channel page tab menu
    function hideShortsTabOnChannel() {
        const elements = document.querySelectorAll('.tab-content');
        const filteredElements = Array.from(elements).filter(element => element.textContent.replace(/\s/g, '').replace(/\n/g, '') === 'Shorts');
        filteredElements.forEach(element => {
            const parent = element.parentNode;
            parent.parentNode.removeChild(parent);
        });
    }
}