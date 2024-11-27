const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
const onClickHandler = browserAPI.action ? browserAPI.action.onClicked : browserAPI.browserAction.onClicked;

const isYouTubePage = (url) => new URL(url).hostname.endsWith('youtube.com');

// Insert CSS and add custom div to page to keep track of hide state
const injectYouTubeShortStyles = (tabId) => {
    if (browserAPI === chrome) {
        browserAPI.scripting.insertCSS({
            files: ['styles/shorts-selectors.css'],
            target: { tabId }
        }).catch(err => console.log('Error inserting styles', err));

        browserAPI.scripting.executeScript({
            target: { tabId },
            function: () => {
                const hysDiv = document.createElement('hide-youtube-shorts');
                hysDiv.setAttribute('state', 'true');
                document.body.appendChild(hysDiv);
            }
        }).catch(err => console.log('Error executing script', err));
    } else {
        browserAPI.tabs.insertCSS(tabId, {
            file: 'styles/shorts-selectors.css'
        }).catch(err => console.log('Error inserting styles', err));

        browserAPI.tabs.executeScript(tabId, {
            code: `
                const hysDiv = document.createElement('hide-youtube-shorts');
                hysDiv.setAttribute('state', 'true');
                document.body.appendChild(hysDiv);
            `
        }).catch(err => console.log('Error executing script', err));
    }
};

// Toggle Shorts visibility
const toggleYouTubeShortsVisibility = (tab) => {
    const getCurrentState = () => {
        if (browserAPI === chrome) {
            browserAPI.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => {
                    const hysDiv = document.querySelector('hide-youtube-shorts');
                    return hysDiv.getAttribute('state');
                }
            }).then(([{ result: state }]) => {
                executeToggleScript(tab.id, state === 'false');
            }).catch(err => console.log('Error checking state', err));
        } else {
            browserAPI.tabs.executeScript(tab.id, {
                code: `
                    document.querySelector('hide-youtube-shorts').getAttribute('state')
                `
            }).then(([state]) => {
                executeToggleScript(tab.id, state === 'false');
            }).catch(err => console.log('Error checking state', err));
        }
    };

    const executeToggleScript = (tabId, isHiding) => {
        if (browserAPI === chrome) {
            browserAPI.scripting[isHiding ? 'insertCSS' : 'removeCSS']({
                files: ['styles/shorts-selectors.css'],
                target: { tabId }
            }).catch(err => console.log('Error toggling styles', err));

            browserAPI.scripting.executeScript({
                target: { tabId },
                function: (hide) => {
                    const hysDiv = document.querySelector('hide-youtube-shorts');
                    hysDiv.setAttribute('state', hide ? 'true' : 'false');
                },
                args: [isHiding]
            }).catch(err => console.log('Error executing script', err));
        } else {
            browserAPI.tabs[isHiding ? 'insertCSS' : 'removeCSS'](tabId, {
                file: 'styles/shorts-selectors.css'
            }).catch(err => console.log('Error toggling styles', err));

            browserAPI.tabs.executeScript(tabId, {
                code: `
                    document.querySelector('hide-youtube-shorts').setAttribute('state', '${isHiding ? 'true' : 'false'}');
                `
            }).catch(err => console.log('Error executing script', err));
        }

        updateIcon(isHiding);
    };

    const updateIcon = (isHiding) => {
        const iconPath = isHiding ? { 16: 'public/icons/icon16.png' } : { 16: 'public/icons/icon16_disabled.png' };
        const title = isHiding ? 'Hide YouTube Shorts' : 'Hide YouTube Shorts - Disabled';

        if (browserAPI === chrome) {
            browserAPI.action.setIcon({ path: iconPath });
            browserAPI.action.setTitle({ title: title });
        } else {
            browserAPI.browserAction.setIcon({ path: iconPath });
            browserAPI.browserAction.setTitle({ title: title });
        }
    };

    getCurrentState();
};

// Reload YouTube tabs on extension install or update
browserAPI.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install' || details.reason === 'update') {
        browserAPI.tabs.query({ url: ['*://*.youtube.com/*'] }, (tabs) => {
            tabs.forEach(tab => browserAPI.tabs.reload(tab.id));
        });
    }
});

// Inject Shorts hiding styles and div when YouTube tabs are updated
browserAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (isYouTubePage(tab.url) && changeInfo.status === 'loading') {
        injectYouTubeShortStyles(tabId);
    }
});

// Toggle Shorts visibility when extension icon is clicked
onClickHandler.addListener((tab) => {
    browserAPI.tabs.query({ url: ['*://*.youtube.com/*'] }, (tabs) => {
        tabs.forEach(toggleYouTubeShortsVisibility);
    });
});