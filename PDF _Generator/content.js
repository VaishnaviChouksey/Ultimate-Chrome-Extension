chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'requestSelectedText') {
      const selectedText = window.getSelection().toString();
      chrome.runtime.sendMessage({ action: 'sendSelectedText', text: selectedText });
  }
});

