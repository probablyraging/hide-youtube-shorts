I've decided to breathe new life into this repo and release a completely revised version of HYS. This is a full top-to-bottom rewrite, but it still retains the core functionality of the old version, with the following notable changes:
- Removed the popup window for simplicity
  - This eliminates the togglable options from previous versions and focuses solely on hiding Shorts videos everywhere on YouTube by default
  - The extension can still be easily toggled on and off by clicking the extension's icon in the URL toolbar, allowing you to hide/show Shorts content in real-time
- Now using friendlier permissions
  - The extension now uses `*://*.youtube.com/*` instead of the previous `<all_urls>` permission, making it more privacy-conscious
- The extension is now available for Firefox users as well