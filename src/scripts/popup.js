window.addEventListener('load', checkState);

function checkState() {
    chrome.storage.sync.get(['toggleState'], function (result) {
        if (result.toggleState === undefined) {
            chrome.storage.sync.set({ toggleState: 'on' });
        } else if (result.toggleState === 'on') {
            toggleBtn.style.backgroundImage = 'url(../images/power-button-on.svg)';
        } else {
            toggleBtn.style.backgroundImage = 'url(../images/power-button-off.svg)';
        }
    });
}

const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', toggleClick);

function toggleClick() {
    chrome.storage.sync.get(['toggleState'], function (result) {
        if (result.toggleState === 'on') {
            // turn off
            toggleBtn.style.backgroundImage = 'url(../images/power-button-off.svg)';
            chrome.storage.sync.set({ toggleState: 'off' });
            reloadBtn.style.display = 'block';
        } else {
            // turn on
            toggleBtn.style.backgroundImage = 'url(../images/power-button-on.svg)';
            chrome.storage.sync.set({ toggleState: 'on' });
            reloadBtn.style.display = 'none';
        }
    });
}

const reloadBtn =  document.getElementById('reloadBtn');
reloadBtn.addEventListener('click', reloadClick);

function reloadClick() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
    window.close();
}

const supportBtn = document.getElementById('supportBtn');
supportBtn.addEventListener('click', supportClick);

function supportClick() {
    window.close();
}