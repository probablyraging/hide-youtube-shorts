chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Listen for updates to the current tab and if the tab's URL
    // includes "https://www.youtube.com/", execute the hideShorts function
    if (tab.url.includes("https://www.youtube.com/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: hideShorts
        });
    }
});

function hideShorts() {
    // Check for shorts videos and tabs every 100 milliseconds
    setInterval(() => {
        chrome.storage.sync.get(['toggleState'], function (result) {
            if (result.toggleState === 'on') {
                // Nav menu
                chrome.storage.sync.get(['toggleNavState'], function (result) {
                    if (result.toggleNavState === 'on') hideElements('#endpoint[title="Shorts"]');
                });
                // Home Feed
                chrome.storage.sync.get(['toggleHomeFeedState'], function (result) {
                    if (result.toggleHomeFeedState === 'on') hideElements('#title.style-scope.ytd-rich-shelf-renderer');
                    if (result.toggleHomeFeedState === 'on') hideElements('[href^="/shorts/"]');
                });
                // Home Feed
                chrome.storage.sync.get(['toggleTabState'], function (result) {
                    if (result.toggleTabState === 'on') hideElements('.tab-content', 'shorts');
                });
            }
        });
    }, 100);

    function hideElements(selector, text) {
        if (selector === '[href^="/shorts/"]') {
            const shorts = document.querySelectorAll('[href^="/shorts/"]');
            shorts.forEach(short => {
                if (short.parentNode.id === 'item' || short.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
                short.parentNode.parentNode.parentNode.style.display = 'none';
            });
        }
        // Find all elements matching the provided selector and hide them if they contain the provided text
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!text || element.textContent.toLowerCase().replace(/\s/g, '').replace(/\n/g, '') === text) {
                if (selector === '#title.style-scope.ytd-rich-shelf-renderer') {
                    // Remove 5 parent nodes for the shorts shelf element
                    removeParentNodes(element, 5);
                } else {
                    const parent = element.parentNode;
                    parent.parentNode.removeChild(parent);
                }
            }
        });
    }

    function removeParentNodes(element, n) {
        for (let i = 0; i < n; i++) {
            element = element.parentNode;
            if (!element || element.parentNode.id === 'item' || element.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'submenu') return;
        }
        element.parentNode.removeChild(element);
    }
}