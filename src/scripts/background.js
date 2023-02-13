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

function hideShorts() {
    if (document.body.classList.contains('intLoaded')) clearInterval(int);
    document.body.classList.add('intLoaded');

    // Check for shorts videos and tabs every 100 milliseconds
    int = setInterval(() => {
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
                    if (result.toggleHomeFeedState === 'on') hideShortsShelf(), hideShortsVideosHomeFeed();
                });
                // Subscriptions feed
                chrome.storage.sync.get(['toggleSubscriptionFeedState'], function (result) {
                    if (result.toggleSubscriptionFeedState === 'on') hideShortsVideosSubscriptionFeed();
                });
                // Trending feed
                chrome.storage.sync.get(['toggleTrendingFeedState'], function (result) {
                    if (result.toggleTrendingFeedState === 'on') hideShortsVideosTrendingFeed();
                });
                // Search results
                chrome.storage.sync.get(['toggleSearchState'], function (result) {
                    if (result.toggleSearchState === 'on') hideShortsVideosSearchResults();
                });
                // Channel tab
                chrome.storage.sync.get(['toggleTabState'], function (result) {
                    if (result.toggleTabState === 'on') hideShortsTabOnChannel();
                });
                // Notification menu
                chrome.storage.sync.get(['toggleNotificationState'], function (result) {
                    if (result.toggleNotificationState === 'on') hideShortsNotificationMenu();
                });
                // Home tab
                chrome.storage.sync.get(['toggleHomeTabState'], function (result) {
                    if (result.toggleHomeTabState === 'on') hideShortsHomeTab();
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

    // Hide the shorts shelf in home and gaming feeds
    function hideShortsShelf() {
        if (document.title.toLowerCase() === 'youtube') {
            const elementsHomePage = document.querySelectorAll('.style-scope ytd-rich-shelf-renderer');
            elementsHomePage.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.removeChild(parent);
            });
            const elementsExplorePages = document.querySelectorAll('.style-scope ytd-reel-shelf-renderer');
            elementsExplorePages.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.removeChild(parent);
            });
        }
    }

    // Hide shorts video elements in the home feed
    function hideShortsVideosHomeFeed() {
        if (document.title.toLowerCase() === 'youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                if (parent.hasAttribute('rich-grid-thumbnail')) parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }

    // Hide shorts video elements in the subscription feed
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

    // Hide shorts videos elements and shorts shelf elements on the trending feed
    function hideShortsVideosTrendingFeed() {
        if (document.title.toLowerCase() == 'trending - youtube') {
            const elementsGroupOne = document.querySelectorAll('[href^="/shorts/"]');
            elementsGroupOne.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
            const elementsGroupTwo = document.querySelectorAll('.style-scope ytd-reel-shelf-renderer');
            elementsGroupTwo.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.removeChild(parent);
            });
        }
    }

    // Hide shorts video elements in search results
    function hideShortsVideosSearchResults() {
        const searchResultsElement = document.querySelector('.style-scope ytd-two-column-search-results-renderer');
        if (!searchResultsElement) return;
        const elementsGroupOne = document.querySelectorAll('.style-scope yt-horizontal-list-renderer');
        elementsGroupOne.forEach(element => {
            const parent = element.parentNode;
            parent.parentNode.style.display = 'none';
        });
        const elementsGroupTwo = document.querySelectorAll('[href^="/shorts/"]');
        elementsGroupTwo.forEach(element => {
            // Ignore shorts in the notification menu
            if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
            const parent = element.parentNode;
            parent.parentNode.parentNode.style.display = 'none';
        });
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

    // Hide shorts video elements in the notification menu
    function hideShortsNotificationMenu() {
        const elements = document.querySelectorAll('[href^="/shorts/"]');
        elements.forEach(element => {
            // Ignore shorts in the notification menu
            if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') {
                const parent = element.parentNode;
                parent.parentNode.style.display = 'none';
            }
        });
    }

    // Hide shorts video elements in the home tab on channel pages
    function hideShortsHomeTab() {
        if (location.href.includes('/channel/') || location.href.includes('@') || location.href.includes('/user/') || location.href.includes('/c/')) {
            const el = document.querySelectorAll('.ytd-c4-tabbed-header-renderer')
            el.forEach(elem => {
                // Don't shorts when the 'shorts' tab is selected
                if (elem.getAttribute('role') === 'tab' && elem.getAttribute('aria-selected') === 'true' && elem.innerText.toLowerCase() !== 'shorts') {
                    const elements = document.querySelectorAll('[href^="/shorts/"]');
                    elements.forEach(element => {
                        // Ignore shorts in the notification menu
                        if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                        const parent = element.parentNode;
                        parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                    });
                }
            });
        }
    }
}