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
    "toggleNotificationState"
  ]);
}
async function hideShorts() {
  if (!chrome.runtime.id)
    return;
  const isMobile = location.href.startsWith("https://m.youtube.com/");
  if (!isMobile)
    return;
  const states = await checkStates();
  if (!states.toggleState)
    return;
  if (states.toggleNavState)
    hideShortsNavButton();
  if (states.toggleHomeFeedState)
    hideShortsShelfHome(), hideShortsVideosHomeFeed();
  if (states.toggleSubscriptionFeedState)
    hideShortsShelfSubscriptions(), hideShortsVideosSubscriptionFeed();
  if (states.toggleTrendingFeedState)
    hideShortsVideosTrendingFeed();
  if (states.toggleSearchState)
    hideShortsVideosSearchResults();
  if (states.toggleRecommendedState)
    hideShortsVideosRecommendedList();
  if (states.toggleTabState)
    hideShortsTabOnChannel();
  if (states.toggleHomeTabState)
    hideShortsHomeTab();
  if (states.toggleRegularState)
    playAsRegularVideo();
}
function hideShortsNavButton() {
  const elements = document.querySelectorAll(".pivot-shorts");
  elements.forEach((element) => {
    const parent = element.parentNode;
    parent.style.display = "none";
  });
}
function hideShortsShelfHome() {
  if (location.href === "https://m.youtube.com/") {
    const elements = document.querySelectorAll(".reel-shelf-items");
    elements.forEach((element) => {
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
  }
}
function hideShortsVideosHomeFeed() {
  if (location.href === "https://m.youtube.com/") {
    const elements = document.querySelectorAll('[href^="/shorts/"]');
    elements.forEach((element) => {
      if (element.classList.contains("ytd-notification-renderer"))
        return;
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
  }
}
function hideShortsShelfSubscriptions() {
  if (location.href === "https://m.youtube.com/feed/subscriptions") {
    const elements = document.querySelectorAll(".reel-shelf-items");
    elements.forEach((element) => {
      const parent = element.parentNode;
      parent.parentNode.parentNode.style.display = "none";
    });
  }
}
function hideShortsVideosSubscriptionFeed() {
  if (location.href.includes("m.youtube.com/feed/subscriptions")) {
    const elements = document.querySelectorAll('[href^="/shorts/"]');
    elements.forEach((element) => {
      if (element.classList.contains("ytd-notification-renderer"))
        return;
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
  }
}
function hideShortsVideosTrendingFeed() {
  if (location.href.includes("m.youtube.com/feed/explore") || location.href.includes("m.youtube.com/gaming")) {
    const elementsGroupOne = document.querySelectorAll('[href^="/shorts/"]');
    elementsGroupOne.forEach((element) => {
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
    const elementsGroupTwo = document.querySelectorAll(".reel-shelf-items");
    elementsGroupTwo.forEach((element) => {
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
  }
}
function hideShortsVideosSearchResults() {
  const searchResultsElement = document.querySelector("ytm-search");
  if (!searchResultsElement)
    return;
  const elementsGroupOne = document.querySelectorAll(".reel-shelf-items");
  elementsGroupOne.forEach((element) => {
    const parent = element.parentNode;
    parent.style.display = "none";
  });
  const elementsGroupTwo = document.querySelectorAll('[aria-label="Shorts"]');
  elementsGroupTwo.forEach((element) => {
    if (element.classList.contains("ytd-notification-renderer"))
      return;
    const parent = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    parent.style.display = "none";
  });
}
function hideShortsVideosRecommendedList() {
  if (location.href.includes("m.youtube.com/watch")) {
    const elements = document.querySelectorAll('[href^="/shorts/"]');
    elements.forEach((element) => {
      if (element.classList.contains("ytd-notification-renderer"))
        return;
      const parent = element.parentNode.parentNode;
      parent.style.display = "none";
    });
  }
}
function hideShortsTabOnChannel() {
  const elements = document.querySelectorAll(".scbrr-tab.center");
  const filteredElements = Array.from(elements).filter((element) => element.innerText.toLowerCase() === "shorts");
  filteredElements.forEach((element) => {
    const parent = element.parentNode;
    parent.removeChild(element);
  });
}
function hideShortsHomeTab() {
  if (location.href.includes("/channel/") || location.href.includes("@") || location.href.includes("/user/") || location.href.includes("/c/")) {
    const elements = document.querySelectorAll(".reel-shelf-items");
    elements.forEach((element) => {
      const parent = element.parentNode.parentNode.parentNode;
      parent.style.display = "none";
    });
    const el = document.querySelectorAll(".scbrr-tab.center");
    el.forEach((elem) => {
      if (elem.getAttribute("role") === "tab" && elem.getAttribute("aria-selected") === "true" && elem.innerText.toLowerCase() !== "shorts") {
        const elements2 = document.querySelectorAll('[href^="/shorts/"]');
        elements2.forEach((element) => {
          if (element.classList.contains("ytd-notification-renderer"))
            return;
          const parent = element.parentNode;
          parent.style.display = "none";
        });
      }
    });
  }
}
function playAsRegularVideo() {
  function getVideoId(url) {
    const regex = /\/shorts\/([^/]+)/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }
  const videoId = getVideoId(location.href);
  if (videoId)
    location.href = `https://m.youtube.com/watch?v=${videoId}`;
}
let observer;
let int;
async function waitForElementToDisplay(toggleStateUpdate) {
  const states = await checkStates();
  if (!states.toggleState)
    return;
  const parentElement = document.body;
  if (parentElement != null) {
    if (toggleStateUpdate)
      hideShorts();
    setTimeout(() => {
      hideShorts();
    }, 1500);
    if (states.toggleTurboState) {
      int = setInterval(() => {
        hideShorts();
      }, 500);
    } else {
      let throttle2 = function(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
          const context = this;
          const args = arguments;
          if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
              if (Date.now() - lastRan >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      };
      var throttle = throttle2;
      observer = new MutationObserver(throttle2(async function(mutations, observer2) {
        setTimeout(() => {
          hideShorts();
        }, 1500);
      }, 3e3));
      observer.observe(parentElement, { childList: true, subtree: true });
    }
    return;
  } else {
    setTimeout(function() {
      waitForElementToDisplay();
    }, 1e3);
  }
}
window.addEventListener("load", async function() {
  waitForElementToDisplay();
});
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  if (message.checkStates) {
    if (observer)
      observer.disconnect();
    clearInterval(int);
    waitForElementToDisplay(true);
  }
});
