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
                // If the toggle state is set to "on", hide the shorts videos, menu tabs, and shelf
                hideElements('.tab-content', 'shorts');
                hideElements('[href^="/shorts/"]');
                hideElements('#endpoint[title="Shorts"]');
                hideElements('#title.style-scope.ytd-rich-shelf-renderer');
            }
        });
    }, 100);

    function hideElements(selector, text) {
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
            if (!element) {
                return;
            }
        }
        element.parentNode.removeChild(element);
    }
}