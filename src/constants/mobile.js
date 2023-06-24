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

async function hideShorts() {
    // If the extension is unloaded or updated, return
    if (!chrome.runtime.id) return;
    // Check if using mobile site
    const isMobile = location.href.startsWith('https://m.youtube.com/');
    if (!isMobile) return;
    // Get extension toggle states
    const states = await checkStates();
    // If the main state is off, return
    if (!states.toggleState) return;
    if (states.toggleNavState) hideShortsNavButton();
    if (states.toggleHomeFeedState) hideShortsShelfHome(), hideShortsVideosHomeFeed();
    if (states.toggleSubscriptionFeedState) hideShortsShelfSubscriptions(), hideShortsVideosSubscriptionFeed();
    if (states.toggleTrendingFeedState) hideShortsVideosTrendingFeed();
    if (states.toggleSearchState) hideShortsVideosSearchResults();
    if (states.toggleRecommendedState) hideShortsVideosRecommendedList();
    if (states.toggleTabState) hideShortsTabOnChannel();
    if (states.toggleHomeTabState) hideShortsHomeTab();
    if (states.toggleRegularState) playAsRegularVideo();
}

// Hide the shorts button in the navigation menu
function hideShortsNavButton() {
    const elements = document.querySelectorAll('.pivot-shorts');
    elements.forEach(element => {
        const parent = element.parentNode;
        parent.style.display = 'none';
    });
}

// Hide the shorts shelf in home and gaming feeds
function hideShortsShelfHome() {
    if (location.href === 'https://m.youtube.com/') {
        const elements = document.querySelectorAll('.reel-shelf-items');
        elements.forEach(element => {
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide shorts video elements in the home feed
function hideShortsVideosHomeFeed() {
    if (location.href === 'https://m.youtube.com/') {
        const elements = document.querySelectorAll('[href^="/shorts/"]');
        elements.forEach(element => {
            // Ignore shorts in the notification menu
            if (element.classList.contains('ytd-notification-renderer')) return;
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide the shorts shelf in home and gaming feeds
function hideShortsShelfSubscriptions() {
    if (location.href === 'https://m.youtube.com/feed/subscriptions') {
        const elements = document.querySelectorAll('.reel-shelf-items');
        elements.forEach(element => {
            const parent = element.parentNode;
            parent.parentNode.parentNode.style.display = 'none';
        });
    }
}

// Hide shorts video elements in the subscription feed
function hideShortsVideosSubscriptionFeed() {
    if (location.href.includes('m.youtube.com/feed/subscriptions')) {
        const elements = document.querySelectorAll('[href^="/shorts/"]');
        elements.forEach(element => {
            if (element.classList.contains('ytd-notification-renderer')) return;
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide shorts videos elements and shorts shelf elements on the trending feed
function hideShortsVideosTrendingFeed() {
    if (location.href.includes('m.youtube.com/feed/explore') || location.href.includes('m.youtube.com/gaming')) {
        const elementsGroupOne = document.querySelectorAll('[href^="/shorts/"]');
        elementsGroupOne.forEach(element => {
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
        const elementsGroupTwo = document.querySelectorAll('.reel-shelf-items');
        elementsGroupTwo.forEach(element => {
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide shorts video elements in search results
function hideShortsVideosSearchResults() {
    const searchResultsElement = document.querySelector('ytm-search');
    if (!searchResultsElement) return;
    const elementsGroupOne = document.querySelectorAll('.reel-shelf-items');
    elementsGroupOne.forEach(element => {
        const parent = element.parentNode;
        parent.style.display = 'none';
    });
    const elementsGroupTwo = document.querySelectorAll('[aria-label="Shorts"]');
    elementsGroupTwo.forEach(element => {
        // Ignore shorts in the notification menu
        if (element.classList.contains('ytd-notification-renderer')) return;
        const parent = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        parent.style.display = 'none';
    });
}

// Hide shorts video elements in the recommended list
function hideShortsVideosRecommendedList() {
    if (location.href.includes('m.youtube.com/watch')) {
        const elements = document.querySelectorAll('[href^="/shorts/"]');
        elements.forEach(element => {
            // Ignore shorts in the notification menu
            if (element.classList.contains('ytd-notification-renderer')) return;
            const parent = element.parentNode.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide the shorts tab on the channel page tab menu
function hideShortsTabOnChannel() {
    const elements = document.querySelectorAll('.scbrr-tab.center');
    const filteredElements = Array.from(elements).filter(element => element.innerText.toLowerCase() === 'shorts');
    filteredElements.forEach(element => {
        const parent = element.parentNode;
        parent.removeChild(element);
    });
}

// Hide shorts video elements in the home tab on channel pages
function hideShortsHomeTab() {
    if (location.href.includes('/channel/') || location.href.includes('@') || location.href.includes('/user/') || location.href.includes('/c/')) {
        const elements = document.querySelectorAll('.reel-shelf-items');
        elements.forEach(element => {
            const parent = element.parentNode.parentNode.parentNode;
            parent.style.display = 'none';
        });
        const el = document.querySelectorAll('.scbrr-tab.center')
        el.forEach(elem => {
            // Don't show shorts when the 'shorts' tab is selected
            if (elem.getAttribute('role') === 'tab' && elem.getAttribute('aria-selected') === 'true' && elem.innerText.toLowerCase() !== 'shorts') {
                const elements = document.querySelectorAll('[href^="/shorts/"]');
                elements.forEach(element => {
                    // Ignore shorts in the notification menu
                    if (element.classList.contains('ytd-notification-renderer')) return;
                    const parent = element.parentNode;
                    parent.style.display = 'none';
                });
            }
        });
    }
}

// Play shorts videos on a regular video page
function playAsRegularVideo() {
    function getVideoId(url) {
        const regex = /\/shorts\/([^/]+)/;
        const match = url.match(regex);
        if (match) {
            return match[1];
        }
        return null;
    }
    // Automatically redirect shorts video pages to a regular video watch page
    const videoId = getVideoId(location.href);
    if (videoId) location.href = `https://m.youtube.com/watch?v=${videoId}`;
}

let observer;
let int;
async function waitForElementToDisplay(toggleStateUpdate) {
    // Check if turbo is enabled - turbo mode runs a more resource hungry version
    const states = await checkStates();
    if (!states.toggleState) return;
    const parentElement = document.body;
    if (parentElement != null) {
        // If a toggle state is updated, run function immediately
        if (toggleStateUpdate) hideShorts(true);
        // Run functions once initially - this helps with the delay in the observer
        setTimeout(() => {
            hideShorts(true);
        }, 1500);
        // If turbo state is on, use more agressive method
        if (states.toggleTurboState) {
            int = setInterval(() => {
                hideShorts();
            }, 500);
        } else {
            // Create new mutation observer
            observer = new MutationObserver(throttle(async function (mutations, observer) {
                // Delay to allow pages to finish loading when navigating on site
                setTimeout(() => {
                    hideShorts();
                }, 1500);
            }, 3000));
            observer.observe(parentElement, { childList: true, subtree: true });
            // Limit how many times the observer will run the hideShorts function per mutation
            function throttle(func, limit) {
                let lastFunc;
                let lastRan;
                return function () {
                    const context = this;
                    const args = arguments;
                    if (!lastRan) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    } else {
                        clearTimeout(lastFunc);
                        lastFunc = setTimeout(function () {
                            if ((Date.now() - lastRan) >= limit) {
                                func.apply(context, args);
                                lastRan = Date.now();
                            }
                        }, limit - (Date.now() - lastRan));
                    }
                }
            }
        }
        return;
    } else {
        // The parent element has not been found, wait and try again
        setTimeout(function () {
            waitForElementToDisplay();
        }, 1000);
    }
}

window.addEventListener("load", async function () {
    waitForElementToDisplay();
});

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.checkStates) {
        if (observer) observer.disconnect();
        clearInterval(int);
        waitForElementToDisplay(true);
    }
});