chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      presentModal: true,
      toggleState: true,
      toggleNavState: true,
      toggleHomeFeedState: true,
      toggleHomeFeedStateLives: false,
      toggleHomeFeedStatePremieres: false,
      toggleSubscriptionFeedState: true,
      toggleSubscriptionFeedStateLives: false,
      toggleSubscriptionFeedStatePremieres: false,
      toggleTrendingFeedState: true,
      toggleSearchState: true,
      toggleRecommendedState: true,
      toggleTabState: true,
      toggleHomeTabState: true,
      toggleTurboState: false,
      toggleRegularState: true,
      toggleNotificationState: true
    }).catch(() => {
      console.log("[STORAGE] Could not set storage item");
    });
    chrome.tabs.query({ url: ["https://www.youtube.com/*", "https://m.youtube.com/*"] }, function(tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.reload(tab.id);
      });
    });
    chrome.action.setBadgeBackgroundColor({ color: "#ed5a64" });
    chrome.action.setBadgeText({ text: "1" });
  }
  if (details.reason === "update") {
    const keys = [
      "toggleState",
      "toggleNavState",
      "toggleHomeFeedState",
      "toggleHomeFeedStateLives",
      "toggleHomeFeedStatePremieres",
      "toggleSubscriptionFeedState",
      "toggleSubscriptionFeedStateLives",
      "toggleSubscriptionFeedStatePremieres",
      "toggleTrendingFeedState",
      "toggleSearchState",
      "toggleRecommendedState",
      "toggleTabState",
      "toggleHomeTabState",
      "toggleTurboState",
      "toggleRegularState",
      "toggleNotificationState"
    ];
    const states = await chrome.storage.sync.get(keys);
    for (const key of keys) {
      if (!(key in states) || states[key] === void 0) {
        await chrome.storage.sync.set({ [key]: false });
      }
    }
    chrome.storage.sync.set({ presentModal: false }).catch(() => {
      console.log("[STORAGE] Could not set storage item");
    });
  }
});
function checkStates() {
  if (!chrome.runtime.id)
    return location.reload();
  return chrome.storage.sync.get([
    "toggleState",
    "toggleNavState",
    "toggleHomeFeedState",
    "toggleHomeFeedStateLives",
    "toggleHomeFeedStatePremieres",
    "toggleSubscriptionFeedState",
    "toggleSubscriptionFeedStateLives",
    "toggleSubscriptionFeedStatePremieres",
    "toggleTrendingFeedState",
    "toggleSearchState",
    "toggleRecommendedState",
    "toggleTabState",
    "toggleHomeTabState",
    "toggleTurboState",
    "toggleRegularState",
    "toggleNotificationState",
    "blockList"
  ]);
}
function insertStyles(tabId, filesToInsert) {
  chrome.scripting.insertCSS({
    files: filesToInsert,
    target: { tabId }
  }).catch((err) => {
    console.log("Error inserting styles", err);
  });
}
function removeStyles(tabId, filesToRemove) {
  chrome.scripting.removeCSS({
    files: filesToRemove,
    target: { tabId }
  }).catch((err) => {
    console.log("Error removing styles", err);
  });
}
function removeAllStyles(tabId) {
  chrome.scripting.removeCSS({
    files: [
      "channel_shorts_tab.css",
      "assets/home_lives.css",
      "assets/home_premieres.css",
      "assets/home_shorts.css",
      "assets/home_tab_shorts.css",
      "assets/navigation_button.css",
      "assets/notification_shorts.css",
      "assets/recommended_shorts.css",
      "assets/search_shorts.css",
      "assets/subscriptions_feed_fix.css",
      "assets/subscriptions_lives.css",
      "assets/subscriptions_premieres.css",
      "assets/subscriptions_shorts.css",
      "assets/subscriptions_shorts_list.css",
      "assets/trending_shorts.css"
    ],
    target: { tabId }
  }).catch((err) => {
    console.log("Error removing styles", err);
  });
  chrome.scripting.executeScript({
    function: () => {
      let checkCount = 0;
      function checkForShortsTab() {
        if (checkCount >= 25) {
          checkCount = 0;
          return;
        }
        const elements = document.querySelectorAll(".tab-content");
        const filteredElements = Array.from(elements).filter((element) => element.textContent.replace(/\s/g, "").replace(/\n/g, "") === "Shorts");
        if (filteredElements.length > 0) {
          filteredElements.forEach((element) => {
            element.parentNode.style.display = "inline-flex";
          });
          checkCount = 0;
        } else {
          checkCount++;
          setTimeout(checkForShortsTab, 100);
        }
      }
      checkForShortsTab();
    },
    target: { tabId }
  }).catch((err) => {
    console.log("Error executing script", err);
  });
}
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  if (message.checkStates) {
    const states = await checkStates();
    chrome.tabs.query({ url: ["https://www.youtube.com/*", "https://m.youtube.com/*"] }, function(tabs) {
      tabs.forEach((tab) => {
        if (message.checkStates === "toggleState")
          mainToggleState(tab, tab.id, states.toggleState);
        if (message.checkStates === "toggleNavState")
          hideShortsNavButton(tab, tab.id, states.toggleNavState);
        if (message.checkStates === "toggleHomeFeedState")
          hideShortsHome(tab, tab.id, states.toggleHomeFeedState);
        if (message.checkStates === "toggleHomeFeedStateLives")
          hideLivesHome(tab, tab.id, states.toggleHomeFeedStateLives);
        if (message.checkStates === "toggleHomeFeedStatePremieres")
          hidePremieresHome(tab, tab.id, states.toggleHomeFeedStatePremieres);
        if (message.checkStates === "toggleSubscriptionFeedState")
          hideShortsSubscriptions(tab, tab.id, states.toggleSubscriptionFeedState);
        if (message.checkStates === "toggleSubscriptionFeedStateLives")
          hideLivesSubscriptions(tab, tab.id, states.toggleSubscriptionFeedStateLives);
        if (message.checkStates === "toggleSubscriptionFeedStatePremieres")
          hidePremieresSubscriptions(tab, tab.id, states.toggleSubscriptionFeedStatePremieres);
        if (message.checkStates === "toggleTrendingFeedState")
          hideShortsTrending(tab, tab.id, states.toggleTrendingFeedState);
        if (message.checkStates === "toggleSearchState")
          hideShortsSearch(tab, tab.id, states.toggleSearchState);
        if (message.checkStates === "toggleRecommendedState")
          hideShortsRecommendedList(tab, tab.id, states.toggleRecommendedState);
        if (message.checkStates === "toggleNotificationState")
          hideShortsNotificationMenu(tab, tab.id, states.toggleNotificationState);
        if (message.checkStates === "toggleTabState")
          hideShortsTabOnChannel(tab, tab.id, states.toggleTabState);
        if (message.checkStates === "toggleHomeTabState")
          hideShortsHomeTab(tab, tab.id, states.toggleHomeTabState);
        if (message.checkStates === "toggleRegularState")
          playAsRegularVideo(tab, tab.id, states.toggleRegularState);
      });
    });
  }
  if (message.blockList) {
    const states = await checkStates();
    chrome.tabs.query({ url: ["https://www.youtube.com/*", "https://m.youtube.com/*"] }, function(tabs) {
      tabs.forEach((tab) => {
        if (message.blockList === "add")
          hideBlockedChannels(tab.id, "add", states.blockList);
        if (message.blockList.action === "remove")
          hideBlockedChannels(tab.id, "remove", message.blockList.channelName);
        if (message.blockList === "clear")
          hideBlockedChannels(tab.id, "clear", states.blockList);
      });
    });
  }
});
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (!chrome.runtime.id)
    return;
  if (tab.url.startsWith("https://www.youtube.com/") || tab.url.startsWith("https://m.youtube.com/")) {
    const states = await checkStates();
    if (!states.toggleState)
      return;
    if (changeInfo.status !== "loading")
      return;
    if (states.toggleNavState)
      hideShortsNavButton(tab, tabId, states.toggleNavState);
    if (states.toggleHomeFeedState)
      hideShortsHome(tab, tabId, states.toggleHomeFeedState);
    if (states.toggleHomeFeedStateLives)
      hideLivesHome(tab, tabId, states.toggleHomeFeedStateLives);
    if (states.toggleHomeFeedStatePremieres)
      hidePremieresHome(tab, tabId, states.toggleHomeFeedStatePremieres);
    if (states.toggleSubscriptionFeedState)
      hideShortsSubscriptions(tab, tabId, states.toggleSubscriptionFeedState);
    if (states.toggleSubscriptionFeedStateLives)
      hideLivesSubscriptions(tab, tabId, states.toggleSubscriptionFeedStateLives);
    if (states.toggleSubscriptionFeedStatePremieres)
      hidePremieresSubscriptions(tab, tabId, states.toggleSubscriptionFeedStatePremieres);
    if (states.toggleTrendingFeedState)
      hideShortsTrending(tab, tabId, states.toggleTrendingFeedState);
    if (states.toggleSearchState)
      hideShortsSearch(tab, tabId, states.toggleSearchState);
    if (states.toggleRecommendedState)
      hideShortsRecommendedList(tab, tabId, states.toggleRecommendedState);
    if (states.toggleNotificationState)
      hideShortsNotificationMenu(tab, tabId, states.toggleNotificationState);
    if (states.toggleTabState)
      hideShortsTabOnChannel(tab, tabId, states.toggleTabState);
    if (states.toggleHomeTabState)
      hideShortsHomeTab(tab, tabId, states.toggleHomeTabState);
    if (states.toggleRegularState)
      playAsRegularVideo(tab, tabId, states.toggleRegularState);
    if (states.blockList.length > 0)
      hideBlockedChannels(tabId, "add", states.blockList);
  }
});
async function mainToggleState(tab, tabId, enabled) {
  if (enabled) {
    const states = await checkStates();
    if (states.toggleNavState)
      hideShortsNavButton(tab, tabId, states.toggleNavState);
    if (states.toggleHomeFeedState)
      hideShortsHome(tab, tabId, states.toggleHomeFeedState);
    if (states.toggleHomeFeedStateLives)
      hideLivesHome(tab, tabId, states.toggleHomeFeedStateLives);
    if (states.toggleHomeFeedStatePremieres)
      hidePremieresHome(tab, tabId, states.toggleHomeFeedStatePremieres);
    if (states.toggleSubscriptionFeedState)
      hideShortsSubscriptions(tab, tabId, states.toggleSubscriptionFeedState);
    if (states.toggleSubscriptionFeedStateLives)
      hideLivesSubscriptions(tab, tabId, states.toggleSubscriptionFeedStateLives);
    if (states.toggleSubscriptionFeedStatePremieres)
      hidePremieresSubscriptions(tab, tabId, states.toggleSubscriptionFeedStatePremieres);
    if (states.toggleTrendingFeedState)
      hideShortsTrending(tab, tabId, states.toggleTrendingFeedState);
    if (states.toggleSearchState)
      hideShortsSearch(tab, tabId, states.toggleSearchState);
    if (states.toggleRecommendedState)
      hideShortsRecommendedList(tab, tabId, states.toggleRecommendedState);
    if (states.toggleNotificationState)
      hideShortsNotificationMenu(tab, tabId, states.toggleNotificationState);
    if (states.toggleTabState)
      hideShortsTabOnChannel(tab, tabId, states.toggleTabState);
    if (states.toggleHomeTabState)
      hideShortsHomeTab(tab, tabId, states.toggleHomeTabState);
    if (states.toggleRegularState)
      playAsRegularVideo(tab, tabId, states.toggleRegularState);
    if (states.blockList.length > 0)
      hideBlockedChannels(tabId, "add", states.blockList);
  }
  if (!enabled)
    removeAllStyles(tabId);
}
const homePrefixes = [
  "https://www.youtube.com/",
  "https://www.youtube.com/?app=desktop",
  "https://m.youtube.com/"
];
const subscriptionsPrefixes = [
  "https://www.youtube.com/feed/subscriptions",
  "https://www.youtube.com/feed/subscriptions?app=desktop",
  "https://m.youtube.com/feed/subscriptions",
  "https://www.youtube.com/feed/subscriptions?flow=1"
];
const trendingPrefixes = [
  "https://www.youtube.com/feed/trending",
  "https://www.youtube.com/gaming",
  "https://m.youtube.com/feed/explore",
  "https://m.youtube.com/feed/trending"
];
const channelPrefixes = [
  "https://www.youtube.com/channel/",
  "https://www.youtube.com/@",
  "https://www.youtube.com/user/",
  "https://www.youtube.com/c/",
  "https://m.youtube.com/channel/",
  "https://m.youtube.com/@",
  "https://m.youtube.com/user/",
  "https://m.youtube.com/c/"
];
function hideBlockedChannels(tabId, action, blockList) {
  if (action === "add") {
    blockList.forEach((channelName) => {
      chrome.scripting.insertCSS({
        css: `
            ytd-rich-item-renderer:has(a[href*="/@${channelName}"]) {
                display: none !important;
            }
            ytd-shelf-renderer:has(a[href*="/@${channelName}"]) {
                display: none !important;
            }
            ytd-video-renderer:has(a[href*="/@${channelName}"]) {
                display: none !important;
            }
            `,
        target: { tabId }
      }).catch((err) => {
        console.log("Error inserting styles", err);
      });
    });
  }
  if (action === "remove") {
    chrome.scripting.insertCSS({
      css: `
            ytd-rich-item-renderer:has(a[href*="/@${blockList}"]) {
                display: inline-flex !important;
            }
            ytd-shelf-renderer:has(a[href*="/@${blockList}"]) {
                display: inline-flex !important;
            }
            ytd-video-renderer:has(a[href*="/@${blockList}"]) {
                display: inline-flex !important;
            }
            `,
      target: { tabId }
    }).catch((err) => {
      console.log("Error inserting styles", err);
    });
  }
  if (action === "clear") {
    blockList.forEach((channelName) => {
      chrome.scripting.insertCSS({
        css: `
                ytd-rich-item-renderer:has(a[href*="/@${channelName}"]) {
                    display: inline-flex !important;
                }
                ytd-shelf-renderer:has(a[href*="/@${channelName}"]) {
                    display: inline-flex !important;
                }
                ytd-video-renderer:has(a[href*="/@${channelName}"]) {
                    display: inline-flex !important;
                }
            `,
        target: { tabId }
      }).catch((err) => {
        console.log("Error inserting styles", err);
      });
    });
  }
}
function hideShortsNavButton(tab, tabId, enabled) {
  if (tab.url.startsWith("https://www.youtube.com/") || tab.url.startsWith("https://m.youtube.com/")) {
    const files = ["assets/navigation_button.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsHome(tab, tabId, enabled) {
  if (homePrefixes.includes(tab.url)) {
    const files = ["assets/home_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideLivesHome(tab, tabId, enabled) {
  if (tab.url === "https://www.youtube.com/") {
    const files = ["assets/home_lives.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hidePremieresHome(tab, tabId, enabled) {
  if (tab.url === "https://www.youtube.com/") {
    const files = ["assets/home_premieres.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsSubscriptions(tab, tabId, enabled) {
  if (subscriptionsPrefixes.includes(tab.url)) {
    const files = ["assets/subscriptions_shorts.css", "assets/subscriptions_shorts_list.css", "assets/subscriptions_feed_fix.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
  if (tab.url === "https://www.youtube.com/feed/subscriptions?flow=2") {
    const files = ["assets/subscriptions_shorts_list.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideLivesSubscriptions(tab, tabId, enabled) {
  if (subscriptionsPrefixes.includes(tab.url)) {
    const files = ["assets/subscriptions_lives.css", "assets/subscriptions_feed_fix.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hidePremieresSubscriptions(tab, tabId, enabled) {
  if (subscriptionsPrefixes.includes(tab.url)) {
    const files = ["assets/subscriptions_premieres.css", "assets/subscriptions_feed_fix.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsTrending(tab, tabId, enabled) {
  if (trendingPrefixes.some((prefix) => tab.url.startsWith(prefix))) {
    const files = ["assets/trending_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsSearch(tab, tabId, enabled) {
  if (tab.url.startsWith("https://www.youtube.com/results") || tab.url.startsWith("https://m.youtube.com/results")) {
    const files = ["assets/search_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsRecommendedList(tab, tabId, enabled) {
  if (tab.url.startsWith("https://www.youtube.com/watch")) {
    const files = ["assets/recommended_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsNotificationMenu(tab, tabId, enabled) {
  if (tab.url.startsWith("https://www.youtube.com/")) {
    const files = ["assets/notification_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsHomeTab(tab, tabId, enabled) {
  if (channelPrefixes.some((prefix) => tab.url.startsWith(prefix))) {
    const files = ["assets/home_tab_shorts.css"];
    if (enabled)
      insertStyles(tabId, files);
    if (!enabled)
      removeStyles(tabId, files);
  }
}
function hideShortsTabOnChannel(tab, tabId, enabled) {
  if (channelPrefixes.some((prefix) => tab.url.startsWith(prefix))) {
    const files = ["assets/channel_shorts_tab.css"];
    if (enabled) {
      chrome.scripting.executeScript({
        function: () => {
          let checkCount = 0;
          function checkForShortsTab() {
            if (checkCount >= 25) {
              checkCount = 0;
              return;
            }
            const elements = document.querySelectorAll(".tab-content");
            const filteredElements = Array.from(elements).filter((element) => element.textContent.replace(/\s/g, "").replace(/\n/g, "") === "Shorts");
            if (filteredElements.length > 0) {
              filteredElements.forEach((element) => {
                element.parentNode.style.display = "none";
              });
              checkCount = 0;
            } else {
              checkCount++;
              setTimeout(checkForShortsTab, 100);
            }
          }
          checkForShortsTab();
        },
        target: { tabId }
      }).catch((err) => {
        console.log("Error executing script", err);
      });
      insertStyles(tabId, files);
    } else {
      chrome.scripting.executeScript({
        function: () => {
          let checkCount = 0;
          function checkForShortsTab() {
            if (checkCount >= 25) {
              checkCount = 0;
              return;
            }
            const elements = document.querySelectorAll(".tab-content");
            const filteredElements = Array.from(elements).filter((element) => element.textContent.replace(/\s/g, "").replace(/\n/g, "") === "Shorts");
            if (filteredElements.length > 0) {
              filteredElements.forEach((element) => {
                element.parentNode.style.display = "inline-flex";
              });
              checkCount = 0;
            } else {
              checkCount++;
              setTimeout(checkForShortsTab, 100);
            }
          }
          checkForShortsTab();
        },
        target: { tabId }
      }).catch((err) => {
        console.log("Error executing script", err);
      });
      removeStyles(tabId, files);
    }
  }
}
function playAsRegularVideo(tab, tabId, enabled) {
  if (tab.url.startsWith("https://www.youtube.com/shorts/") || tab.url.startsWith("https://m.youtube.com/shorts/")) {
    let getVideoId2 = function(url) {
      const regex = /\/shorts\/([^/]+)/;
      const match = url.match(regex);
      if (match) {
        return match[1];
      }
      return null;
    };
    var getVideoId = getVideoId2;
    const videoId = getVideoId2(tab.url);
    if (videoId && enabled) {
      const newUrl = `https://youtube.com/watch?v=${videoId}`;
      chrome.tabs.update(tabId, { url: newUrl });
    }
  }
}
