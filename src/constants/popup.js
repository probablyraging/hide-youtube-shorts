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

// Get a list of blocked channels
export const getBlockList = async () => {
    const { blockList } = await chrome.storage.sync.get(['blockList']);
    if (blockList && blockList.length > 0) {
        chrome.runtime.sendMessage({ blockList: true });
        return blockList;
    } else {
        chrome.runtime.sendMessage({ checkStates: true });
        return [];
    }
}

// Update block list
export const updateBlockList = async (channelToBlock, action) => {
    if (action === 'add') {
        const { blockList } = await chrome.storage.sync.get(['blockList']);
        if (blockList && blockList.length > 0) {
            await chrome.storage.sync.set({ blockList: [...blockList, channelToBlock] });
        } else {
            await chrome.storage.sync.set({ blockList: [channelToBlock] });
        }
        chrome.runtime.sendMessage({ blockList: 'add' });
    } else if (action === 'remove') {
        const { blockList } = await chrome.storage.sync.get(['blockList']);
        const updatedBlockList = blockList.filter(item => item !== channelToBlock);
        await chrome.storage.sync.set({ blockList: updatedBlockList });
        chrome.runtime.sendMessage({ blockList: { action: 'remove', channelName: channelToBlock } });
    } else if (action === 'clear') {
        await chrome.runtime.sendMessage({ blockList: 'clear' });
        await chrome.storage.sync.set({ blockList: [] });
    }
}

// Validate premium
export const activatePremium = async (email) => {
    return new Promise((resolve) => {
        fetch('https://creatordiscord.xyz/api/hys_activate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(async data => {
                if (data.message) {
                    await chrome.storage.sync.set({ premiumKey: data.message });
                    resolve(data);
                } else if (data.error) {
                    await chrome.storage.sync.remove('premiumKey');
                    resolve(data);
                }
            });
    });
}

// Check if user has premium (for switch states)
export const checkPremium = async () => {
    return new Promise(async (resolve) => {
        const { premiumKey } = await chrome.storage.sync.get(['premiumKey']);
        if (premiumKey) {
            fetch('https://creatordiscord.xyz/api/hys_activate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ premiumKey: premiumKey })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        // Enable switch
                        resolve(false);
                    }
                    if (data.error) {
                        chrome.storage.sync.remove('premiumKey');
                        // Disable switch
                        resolve(true);
                    }
                });
        } else {
            chrome.storage.sync.remove('premiumKey');
            // Disable switch
            resolve(true);
        }
    });
}