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
            toggleHomeFeedStateLives: false,
            toggleHomeFeedStatePremieres: false,
            toggleSubscriptionFeedState: true,
            toggleSubscriptionFeedStateLives: false,
            toggleSubscriptionFeedStatePremieres: false,
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
        // Check for missing states when the extension is updated. This
        // occurrs when a new state is added between versions
        const keys = [
            'toggleState',
            'toggleNavState',
            'toggleHomeFeedState',
            'toggleHomeFeedStateLives',
            'toggleHomeFeedStatePremieres',
            'toggleSubscriptionFeedState',
            'toggleSubscriptionFeedStateLives',
            'toggleSubscriptionFeedStatePremieres',
            'toggleTrendingFeedState',
            'toggleSearchState',
            'toggleRecommendedState',
            'toggleTabState',
            'toggleHomeTabState',
            'toggleTurboState',
            'toggleRegularState',
            'toggleNotificationState',
        ];
        const states = await chrome.storage.sync.get(keys);
        for (const key of keys) {
            if (!(key in states) || states[key] === undefined) {
                await chrome.storage.sync.set({ [key]: false });
            }
        }
        // chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
        //     tabs.forEach(tab => {
        //         chrome.tabs.reload(tab.id);
        //     });
        // });
        chrome.storage.sync.set({ presentModal: true }).catch(() => { console.log('[STORAGE] Could not set storage item') });
        chrome.action.setBadgeBackgroundColor({ color: '#ed5a64' });
        chrome.action.setBadgeText({ text: '1' });
    }
});

// Get stored switch states
function checkStates() {
    // If the extension is unloaded or updated, reload the page to terminate orphaned scripts
    if (!chrome.runtime.id) return location.reload();
    // Get extension toggle states from chrome storage
    return chrome.storage.sync.get([
        'toggleState',
        'toggleNavState',
        'toggleHomeFeedState',
        'toggleHomeFeedStateLives',
        'toggleHomeFeedStatePremieres',
        'toggleSubscriptionFeedState',
        'toggleSubscriptionFeedStateLives',
        'toggleSubscriptionFeedStatePremieres',
        'toggleTrendingFeedState',
        'toggleSearchState',
        'toggleRecommendedState',
        'toggleTabState',
        'toggleHomeTabState',
        'toggleTurboState',
        'toggleRegularState',
        'toggleNotificationState',
    ]);
}

// Insert page styles
function insertStyles(tabId, filesToInsert) {
    chrome.scripting.insertCSS({
        files: filesToInsert,
        target: { tabId: tabId }
    });
}

// Remove existing page styles
function removeStyles(tabId, filesToRemove) {
    chrome.scripting.removeCSS({
        files: filesToRemove,
        target: { tabId: tabId }
    });
}

// Remove all page styles
function removeAllStyles(tabId) {
    chrome.scripting.removeCSS({
        files: [
            'assets/home_lives.css',
            'assets/home_premieres.css',
            'assets/home_shorts.css',
            'assets/home_tab_shorts.css',
            'assets/navigation_button.css',
            'assets/notification_shorts.css',
            'assets/recommended_shorts.css',
            'assets/search_shorts.css',
            'assets/sub_feed_fix.css',
            'assets/subscriptions_lives.css',
            'assets/subscriptions_premieres.css',
            'assets/subscriptions_shorts.css',
            'assets/trending_shorts.css',
        ],
        target: { tabId: tabId }
    });

    chrome.scripting.executeScript({
        function: () => {
            const elements = document.querySelectorAll('.tab-content');
            const filteredElements = Array.from(elements).filter(element => element.textContent.replace(/\s/g, '').replace(/\n/g, '') === 'Shorts');
            filteredElements.forEach(element => {
                element.parentNode.style.display = 'inline-flex';
            });

        },
        target: { tabId: tabId }
    });
}

// Handle messages sent from the extension popup
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.checkStates) {
        // Get extension toggle states
        const states = await checkStates();
        chrome.tabs.query({ url: ['https://www.youtube.com/*', 'https://m.youtube.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                if (message.checkStates === 'toggleState') mainToggleState(tab, tab.id, states.toggleState);
                if (message.checkStates === 'toggleNavState') hideShortsNavButton(tab, tab.id, states.toggleNavState);
                if (message.checkStates === 'toggleHomeFeedState') hideShortsHome(tab, tab.id, states.toggleHomeFeedState);
                if (message.checkStates === 'toggleHomeFeedStateLives') hideLivesHome(tab, tab.id, states.toggleHomeFeedStateLives);
                if (message.checkStates === 'toggleHomeFeedStatePremieres') hidePremieresHome(tab, tab.id, states.toggleHomeFeedStatePremieres);
                if (message.checkStates === 'toggleSubscriptionFeedState') hideShortsSubscriptions(tab, tab.id, states.toggleSubscriptionFeedState);
                if (message.checkStates === 'toggleSubscriptionFeedStateLives') hideLivesSubscriptions(tab, tab.id, states.toggleSubscriptionFeedStateLives);
                if (message.checkStates === 'toggleSubscriptionFeedStatePremieres') hidePremieresSubscriptions(tab, tab.id, states.toggleSubscriptionFeedStatePremieres);
                if (message.checkStates === 'toggleTrendingFeedState') hideShortsTrending(tab, tab.id, states.toggleTrendingFeedState);
                if (message.checkStates === 'toggleSearchState') hideShortsSearch(tab, tab.id, states.toggleSearchState);
                if (message.checkStates === 'toggleRecommendedState') hideShortsRecommendedList(tab, tab.id, states.toggleRecommendedState);
                if (message.checkStates === 'toggleNotificationState') hideShortsNotificationMenu(tab, tab.id, states.toggleNotificationState);
                if (message.checkStates === 'toggleTabState') hideShortsTabOnChannel(tab, tab.id, states.toggleTabState);
                if (message.checkStates === 'toggleHomeTabState') hideShortsHomeTab(tab, tab.id, states.toggleHomeTabState);
                if (message.checkStates === 'toggleRegularState') playAsRegularVideo(tab, tab.id, states.toggleRegularState);
            });
        });
    }
});

// Hnadle tabs when they are updated
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    // If the extension is unloaded or updated, return
    if (!chrome.runtime.id) return;
    // Get extension toggle states
    const states = await checkStates();
    // If the main state is off, return
    if (!states.toggleState) return;
    if (changeInfo.status !== 'loading') return;

    if (states.toggleNavState) hideShortsNavButton(tab, tabId, states.toggleNavState);
    if (states.toggleHomeFeedState) hideShortsHome(tab, tabId, states.toggleHomeFeedState);
    if (states.toggleHomeFeedStateLives) hideLivesHome(tab, tabId, states.toggleHomeFeedStateLives);
    if (states.toggleHomeFeedStatePremieres) hidePremieresHome(tab, tabId, states.toggleHomeFeedStatePremieres);
    if (states.toggleSubscriptionFeedState) hideShortsSubscriptions(tab, tabId, states.toggleSubscriptionFeedState);
    if (states.toggleSubscriptionFeedStateLives) hideLivesSubscriptions(tab, tabId, states.toggleSubscriptionFeedStateLives);
    if (states.toggleSubscriptionFeedStatePremieres) hidePremieresSubscriptions(tab, tabId, states.toggleSubscriptionFeedStatePremieres);
    if (states.toggleTrendingFeedState) hideShortsTrending(tab, tabId, states.toggleTrendingFeedState);
    if (states.toggleSearchState) hideShortsSearch(tab, tabId, states.toggleSearchState);
    if (states.toggleRecommendedState) hideShortsRecommendedList(tab, tabId, states.toggleRecommendedState);
    if (states.toggleNotificationState) hideShortsNotificationMenu(tab, tabId, states.toggleNotificationState);
    if (states.toggleTabState) hideShortsTabOnChannel(tab, tabId, states.toggleTabState);
    if (states.toggleHomeTabState) hideShortsHomeTab(tab, tabId, states.toggleHomeTabState);
    if (states.toggleRegularState) playAsRegularVideo(tab, tabId, states.toggleRegularState);
});

// Add or remove styles when main toggle state is updated
async function mainToggleState(tab, tabId, enabled) {
    if (enabled) {
        // Get extension toggle states
        const states = await checkStates();
        if (states.toggleNavState) hideShortsNavButton(tab, tabId, states.toggleNavState);
        if (states.toggleHomeFeedState) hideShortsHome(tab, tabId, states.toggleHomeFeedState);
        if (states.toggleHomeFeedStateLives) hideLivesHome(tab, tabId, states.toggleHomeFeedStateLives);
        if (states.toggleHomeFeedStatePremieres) hidePremieresHome(tab, tabId, states.toggleHomeFeedStatePremieres);
        if (states.toggleSubscriptionFeedState) hideShortsSubscriptions(tab, tabId, states.toggleSubscriptionFeedState);
        if (states.toggleSubscriptionFeedStateLives) hideLivesSubscriptions(tab, tabId, states.toggleSubscriptionFeedStateLives);
        if (states.toggleSubscriptionFeedStatePremieres) hidePremieresSubscriptions(tab, tabId, states.toggleSubscriptionFeedStatePremieres);
        if (states.toggleTrendingFeedState) hideShortsTrending(tab, tabId, states.toggleTrendingFeedState);
        if (states.toggleSearchState) hideShortsSearch(tab, tabId, states.toggleSearchState);
        if (states.toggleRecommendedState) hideShortsRecommendedList(tab, tabId, states.toggleRecommendedState);
        if (states.toggleNotificationState) hideShortsNotificationMenu(tab, tabId, states.toggleNotificationState);
        if (states.toggleTabState) hideShortsTabOnChannel(tab, tabId, states.toggleTabState);
        if (states.toggleHomeTabState) hideShortsHomeTab(tab, tabId, states.toggleHomeTabState);
        if (states.toggleRegularState) playAsRegularVideo(tab, tabId, states.toggleRegularState);
    }
    if (!enabled) removeAllStyles(tabId);
}

// Hide the shorts button in the navigation menu
function hideShortsNavButton(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/')) {
        const files = ['assets/navigation_button.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the home feed
function hideShortsHome(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/') {
        const files = ['assets/home_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide live video elements in the home feed
function hideLivesHome(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/') {
        const files = ['assets/home_lives.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide premieres video elements in the home feed
function hidePremieresHome(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/') {
        const files = ['assets/home_premieres.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the subscriptions feed
function hideShortsSubscriptions(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/feed/subscriptions') {
        const files = ['assets/subscriptions_shorts.css', 'assets/sub_feed_fix.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide lives video elements in the subscriptions feed
function hideLivesSubscriptions(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/feed/subscriptions') {
        const files = ['assets/subscriptions_lives.css', 'assets/sub_feed_fix.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide premieres video elements in the subscriptions feed
function hidePremieresSubscriptions(tab, tabId, enabled) {
    if (tab.url === 'https://www.youtube.com/feed/subscriptions') {
        const files = ['assets/subscriptions_premieres.css', 'assets/sub_feed_fix.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the trending feed
function hideShortsTrending(tab, tabId, enabled) {
    if ((tab.url.includes('https://www.youtube.com/feed/trending') || tab.url.includes('https://www.youtube.com/gaming'))) {
        const files = ['assets/trending_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in search results
function hideShortsSearch(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/results')) {
        const files = ['assets/search_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the recommended list
function hideShortsRecommendedList(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/watch')) {
        const files = ['assets/recommended_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the notification menu
function hideShortsNotificationMenu(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/')) {
        const files = ['assets/notification_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide shorts video elements in the home tab on channel pages
function hideShortsHomeTab(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/channel/') || tab.url.includes('https://www.youtube.com/@') || tab.url.includes('https://www.youtube.com/user/') || tab.url.includes('https://www.youtube.com/c/')) {
        const files = ['assets/home_tab_shorts.css'];
        if (enabled) insertStyles(tabId, files);
        if (!enabled) removeStyles(tabId, files);
    }
}

// Hide the shorts tab on channel pages
function hideShortsTabOnChannel(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/channel/') || tab.url.includes('https://www.youtube.com/@') || tab.url.includes('https://www.youtube.com/user/') || tab.url.includes('https://www.youtube.com/c/')) {
        if (enabled) {
            chrome.scripting.executeScript({
                function: () => {
                    const elements = document.querySelectorAll('.tab-content');
                    const filteredElements = Array.from(elements).filter(element => element.textContent.replace(/\s/g, '').replace(/\n/g, '') === 'Shorts');
                    filteredElements.forEach(element => {
                        element.parentNode.style.display = 'none';
                    });

                },
                target: { tabId: tabId }
            });
        } else {
            chrome.scripting.executeScript({
                function: () => {
                    const elements = document.querySelectorAll('.tab-content');
                    const filteredElements = Array.from(elements).filter(element => element.textContent.replace(/\s/g, '').replace(/\n/g, '') === 'Shorts');
                    filteredElements.forEach(element => {
                        element.parentNode.style.display = 'inline-flex';
                    });

                },
                target: { tabId: tabId }
            });
        }
    }
}

// Play shorts as regular video
function playAsRegularVideo(tab, tabId, enabled) {
    if (tab.url.includes('https://www.youtube.com/shorts/')) {
        function getVideoId(url) {
            const regex = /\/shorts\/([^/]+)/;
            const match = url.match(regex);
            if (match) {
                return match[1];
            }
            return null;
        }
        // Automatically redirect shorts video pages to a regular video watch page
        const videoId = getVideoId(tab.url);
        if (videoId && enabled) {
            const newUrl = `https://youtube.com/watch?v=${videoId}`;
            chrome.tabs.update(tabId, { url: newUrl });
        }
    }
}