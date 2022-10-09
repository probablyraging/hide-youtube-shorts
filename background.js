chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url.includes("https://www.youtube.com/")) {
        if (changeInfo.status == 'complete') {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: hideShorts
            });
        }
    }
})

function hideShorts() {
    setInterval(() => {
        const shorts = document.querySelectorAll('[href^="/shorts/"]');
        shorts.forEach(short => {
            short.parentNode.parentNode.parentNode.style.display = 'none';
        });
    }, 1000);
}

// function hideShorts() {
//     setTimeout(() => {
//         var div = document.createElement('div');
//         let header = document.getElementById('tabsContainer')
//         header.appendChild(div);
//         div.id = 'hideShortsBtn';
//         div.style.position = 'relative';
//         div.style.float = 'right';
//         div.style.width = '34px';
//         div.style.height = '48px';
//         div.style.backgroundColor = 'red';
//         div.onclick = function () {
//             const shorts = document.querySelectorAll('[href^="/shorts/"]');
//             shorts.forEach(short => {
//                 short.parentNode.parentNode.parentNode.style.display = 'none';
//             });
//         };
//     }, 1000);
// }