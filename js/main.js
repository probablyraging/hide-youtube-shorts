

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.toggleState) {
        const isMobile = location.href.includes('https://m.youtube.com/');
        const states = await checkStates();
        // If the main state is on, un functions once initially - this helps with the delay in the observer
        if (states.toggleNavState) hideShortsNavButton(isMobile);
        if (states.toggleHomeFeedState) hideShortsShelf(isMobile), hideShortsVideosHomeFeed(isMobile);
        if (states.toggleSubscriptionFeedState) hideShortsVideosSubscriptionFeed(isMobile);
        if (states.toggleTrendingFeedState) hideShortsVideosTrendingFeed(isMobile);
        if (states.toggleSearchState) hideShortsVideosSearchResults(isMobile);
        if (states.toggleTabState) hideShortsTabOnChannel(isMobile);
        if (states.toggleNotificationState) hideShortsNotificationMenu(isMobile);
        if (states.toggleHomeTabState) hideShortsHomeTab(isMobile);
    }
});

window.addEventListener("load", async function () {
    waitForElementToDisplay();
});

async function waitForElementToDisplay() {
    // Check if turbo is enabled - turbo mode runs a more resource hungry version
    const { toggleTurboState } = await checkStates();
    if (toggleTurboState) {
        if (document.body.classList.contains('intLoaded')) clearInterval(int);
        document.body.classList.add('intLoaded');
        // Check for shorts videos and tabs every 100 milliseconds
        int = setInterval(() => {
            hideShorts(toggleTurboState);
        }, 500);
    } else {
        const parentElement = document.body;
        if (parentElement != null) {
            const isMobile = location.href.includes('https://m.youtube.com/');
            // The parent element has been found, get extension toggle states
            const states = await checkStates();
            // If the main state is on, un functions once initially - this helps with the delay in the observer
            if (states.toggleState) {
                if (states.toggleNavState) hideShortsNavButton(isMobile);
                if (states.toggleHomeFeedState) hideShortsShelf(isMobile), hideShortsVideosHomeFeed(isMobile);
                if (states.toggleSubscriptionFeedState) hideShortsVideosSubscriptionFeed(isMobile);
                if (states.toggleTrendingFeedState) hideShortsVideosTrendingFeed(isMobile);
                if (states.toggleSearchState) hideShortsVideosSearchResults(isMobile);
                if (states.toggleTabState) hideShortsTabOnChannel(isMobile);
                if (states.toggleNotificationState) hideShortsNotificationMenu(isMobile);
                if (states.toggleHomeTabState) hideShortsHomeTab(isMobile);
            }
            // Create new mutation observer
            const observer = new MutationObserver(function (mutations, observer) {
                hideShorts(toggleTurboState);
            });
            observer.observe(parentElement, { childList: true, subtree: true });
            return;
        } else {
            // The parent element has not been found, wait and try again
            setTimeout(function () {
                waitForElementToDisplay();
            }, 1000);
        }
    }
}

function checkStates() {
    // If the extension is unloaded or updated, reload the page to terminate orphaned scripts
    if (!chrome.runtime.id) return location.reload();
    // Get extension toggle states from chrome storage
    return chrome.storage.sync.get([
        'toggleState',
        'toggleNavState',
        'toggleHomeFeedState',
        'toggleSubscriptionFeedState',
        'toggleTrendingFeedState',
        'toggleSearchState',
        'toggleTabState',
        'toggleNotificationState',
        'toggleHomeTabState',
        'toggleTurboState'
    ]);
}

let preventFuncSpam = false;
async function hideShorts(turboState) {
    // Get extension toggle states
    const states = await checkStates();
    // If the main state is off, return
    if (!states.toggleState) return;
    const isMobile = location.href.includes('https://m.youtube.com/');
    // Check for cooldown to prevent function spam
    if (preventFuncSpam) return;
    // Set the cooldown to try and remove it after 3 seconds
    if (!turboState) preventFuncSpam = true;
    setTimeout(() => {
        preventFuncSpam = false;
    }, 3000);
    if (states.toggleHomeFeedState) hideShortsShelf(isMobile), hideShortsVideosHomeFeed(isMobile);
    if (states.toggleSubscriptionFeedState) hideShortsVideosSubscriptionFeed(isMobile);
    if (states.toggleTrendingFeedState) hideShortsVideosTrendingFeed(isMobile);
    if (states.toggleSearchState) hideShortsVideosSearchResults(isMobile);
    if (states.toggleTabState) hideShortsTabOnChannel(isMobile);
    if (states.toggleNotificationState) hideShortsNotificationMenu(isMobile);
    if (states.toggleHomeTabState) hideShortsHomeTab(isMobile);
}

// Hide the shorts button in the navigation menu
function hideShortsNavButton(isMobile) {
    if (!isMobile) {
        const selector = document.querySelector('#endpoint[title="Shorts"]');
        if (selector) {
            const elements = document.querySelectorAll('#endpoint[title="Shorts"]');
            elements.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.removeChild(parent);
            });
            return;
        } else {
            // The element has not been found, wait and try again
            setTimeout(function () {
                hideShortsNavButton(isMobile);
            }, 1000);
        }
    } else {
        const elements = document.querySelectorAll('.pivot-shorts');
        elements.forEach(element => {
            const parent = element.parentNode;
            parent.style.display = 'none';
        });
    }
}

// Hide the shorts shelf in home and gaming feeds
function hideShortsShelf(isMobile) {
    if (!isMobile) {
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
    } else {
        if (document.title.toLowerCase() === 'home - youtube') {
            const elements = document.querySelectorAll('.reel-shelf-items');
            elements.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }
}

// Hide shorts video elements in the home feed
function hideShortsVideosHomeFeed(isMobile) {
    if (!isMobile) {
        if (document.title.toLowerCase() === 'youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                if (parent.hasAttribute('rich-grid-thumbnail')) parent.parentNode.parentNode.style.display = 'none';
            });
        }
    } else {
        if (document.title.toLowerCase() === 'home - youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }
}

// Hide shorts video elements in the subscription feed
function hideShortsVideosSubscriptionFeed(isMobile) {
    if (!isMobile) {
        if (document.title.toLowerCase() === 'subscriptions - youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                // Ignore shorts in the notification menu
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                // When the subscription feed is being viewed in gride view
                if (parent.parentNode.parentNode.parentNode.parentNode.nodeName === 'YTD-GRID-VIDEO-RENDERER' || parent.parentNode.parentNode.parentNode.parentNode.classList.contains('ytd-shelf-renderer')) {
                    parent.parentNode.parentNode.style.display = 'none';
                }
                // When the subscription feed is being viewed in list view
                if (parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'YTD-EXPANDED-SHELF-CONTENTS-RENDERER') {
                    parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                }
            });
        }
    } else {
        if (document.title.toLowerCase() === 'subscriptions - youtube') {
            const elements = document.querySelectorAll('[href^="/shorts/"]');
            elements.forEach(element => {
                if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }
}

// Hide shorts videos elements and shorts shelf elements on the trending feed
function hideShortsVideosTrendingFeed(isMobile) {
    if (!isMobile) {
        if (document.title.toLowerCase() === 'trending - youtube') {
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
    } else {
        if (document.title.toLowerCase() === 'explore - youtube') {
            const elementsGroupOne = document.querySelectorAll('[href^="/shorts/"]');
            elementsGroupOne.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
            const elementsGroupTwo = document.querySelectorAll('.reel-shelf-items');
            elementsGroupTwo.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
        }
    }
}

// Hide shorts video elements in search results
function hideShortsVideosSearchResults(isMobile) {
    if (!isMobile) {
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
    } else {
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
            if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
            const parent = element.parentNode;
            parent.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        });
    }
}

// Hide the shorts tab on the channel page tab menu
function hideShortsTabOnChannel(isMobile) {
    if (!isMobile) {
        const elements = document.querySelectorAll('.tab-content');
        const filteredElements = Array.from(elements).filter(element => element.textContent.replace(/\s/g, '').replace(/\n/g, '') === 'Shorts');
        filteredElements.forEach(element => {
            const parent = element.parentNode;
            parent.parentNode.removeChild(parent);
        });
    } else {
        const elements = document.querySelectorAll('.scbrr-tab.center');
        const filteredElements = Array.from(elements).filter(element => element.innerText.toLowerCase() === 'shorts');
        filteredElements.forEach(element => {
            const parent = element.parentNode;
            parent.removeChild(element);
        });
    }
}

// Hide shorts video elements in the notification menu
function hideShortsNotificationMenu(isMobile) {
    if (!isMobile) {
        const elements = document.querySelectorAll('[href^="/shorts/"]');
        elements.forEach(element => {
            // Ignore shorts in the notification menu
            if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') {
                const parent = element.parentNode;
                parent.parentNode.style.display = 'none';
            }
        });
    }
}

// Hide shorts video elements in the home tab on channel pages
function hideShortsHomeTab(isMobile) {
    if (!isMobile) {
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
    } else {
        if (location.href.includes('/channel/') || location.href.includes('@') || location.href.includes('/user/') || location.href.includes('/c/')) {
            const elements = document.querySelectorAll('.reel-shelf-items');
            elements.forEach(element => {
                const parent = element.parentNode;
                parent.parentNode.parentNode.style.display = 'none';
            });
            const el = document.querySelectorAll('.scbrr-tab.center')
            el.forEach(elem => {
                // Don't shorts when the 'shorts' tab is selected
                if (elem.getAttribute('role') === 'tab' && elem.getAttribute('aria-selected') === 'true' && elem.innerText.toLowerCase() !== 'shorts') {
                    const elements = document.querySelectorAll('[href^="/shorts/"]');
                    elements.forEach(element => {
                        // Ignore shorts in the notification menu
                        if (element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                        const parent = element.parentNode;
                        parent.style.display = 'none';
                    });
                }
            });
        }
    }
}