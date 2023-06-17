// Get extension toggle states from chrome storage
export const getSwitchStates = async () => {
    const switchStates = await chrome.storage.sync.get([
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
    return switchStates;
}

// Get statistics from chrome storage
export const getStatistics = async () => {
    const statistics = await chrome.storage.sync.get([
        'navButton',
        'shortsShelf',
        'homeFeedShorts',
        'subFeedShorts',
        'trendFeedShorts',
        'searchResultShorts',
        'recommendedShorts',
        'channelTabs',
        'channelShorts',
        'playedAsRegular',
    ]);
    return statistics;
}

// Reset statistics counts
export const resetStatistics = async () => {
    const keys = [
        'navButton',
        'shortsShelf',
        'homeFeedShorts',
        'subFeedShorts',
        'trendFeedShorts',
        'searchResultShorts',
        'recommendedShorts',
        'channelTabs',
        'channelShorts',
        'playedAsRegular',
    ];
    for (const key of keys) {
        await chrome.storage.sync.set({ [key]: 0 });
    }
}

// Set switch states when toggled
export const updateSwitchState = async (switchName) => {
    const storageObject = await chrome.storage.sync.get([switchName]);
    const switchState = storageObject[switchName];
    const newState = !switchState;
    chrome.storage.sync.set({ [switchName]: newState });
    // If the power button is toggled
    if (switchName === 'toggleState') {
        const iconPath = newState
            ? `/icons/icon16.png`
            : '/icons/icon16_disabled.png';
        chrome.action.setIcon({ path: { "16": iconPath } }).catch(() => { });
    }
    chrome.runtime.sendMessage({ checkStates: switchName });
}

// Display a modal with latest changes on install/update
export const presentModal = async () => {
    const { presentModal } = await chrome.storage.sync.get(['presentModal']);
    if (presentModal) {
        return new Promise((resolve) => {
            setTimeout(() => {
                $('body').animate({ width: '425px' }, 250);
                resolve(presentModal);
            }, 250);
        });
    }
}

// When a modal is close, reset the page width and update storage values
export const handleCloseModal = () => {
    chrome.storage.sync.set({ presentModal: false });
    chrome.action.setBadgeText({ text: '' });
    $('body').animate({ width: '400px' }, 250);
}