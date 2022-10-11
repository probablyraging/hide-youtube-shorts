chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.includes("https://www.youtube.com/")) {
        if (changeInfo.status == 'complete') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: hideShorts
            });
        }
    }
});

function hideShorts() {
    setInterval(() => {
        chrome.storage.sync.get(['toggleState'], function (result) {
            if (result.toggleState === 'on') {
                const shorts = document.querySelectorAll('[href^="/shorts/"]');
                shorts.forEach(short => {
                    short.parentNode.parentNode.parentNode.style.display = 'none';
                });
            }
        });
    }, 100);
};