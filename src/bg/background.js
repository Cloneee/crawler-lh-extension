chrome.extension.onMessage.addListener(
  (request, sender, sendResponse) => {
    sendResponse();
  });