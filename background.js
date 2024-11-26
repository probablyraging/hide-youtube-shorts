const browserAPI = (typeof browser !== 'undefined' ? browser : chrome);

const onClickHandler = browserAPI.action ? browserAPI.action.onClicked : browserAPI.browserAction.onClicked;

// Reload any YouTube pages on extension install/update
browserAPI.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        browserAPI.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
            tabs.forEach(tab => {
                browserAPI.tabs.reload(tab.id);
            });
        });
    }
});

// Allow hiding and unhiding of Shorts by clicking the icon in the URL bar
let hideState = true;
onClickHandler.addListener((tab) => {
    browserAPI.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
        tabs.forEach(tab => {
            if (hideState) {
                if (browserAPI === chrome) {
                    chrome.scripting.insertCSS({
                        files: ['styles/unhide.css'],
                        target: { tabId: tab.id }
                    }).catch((err) => { console.log('Error inserting styles', err); });
                } else {
                    browserAPI.tabs.insertCSS(tab.id, {
                        file: 'styles/unhide.css'
                    }).catch((err) => { console.log('Error inserting styles', err); });
                }
                hideState = false;
            } else {
                if (browserAPI === chrome) {
                    chrome.scripting.insertCSS({
                        files: ['styles/hide.css'],
                        target: { tabId: tab.id }
                    }).catch((err) => { console.log('Error inserting styles', err); });
                } else {
                    browserAPI.tabs.insertCSS(tab.id, {
                        file: 'styles/hide.css'
                    }).catch((err) => { console.log('Error inserting styles', err); });
                }
                hideState = true;
            }
        });
    });
});