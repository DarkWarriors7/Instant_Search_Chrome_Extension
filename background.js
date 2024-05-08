
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ 'searchHistory': [] });
});


chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: 'searchSelectedText',
    title: 'Search Selected Text',
    contexts: ['selection']
  });
})


chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'searchSelectedText' && info.selectionText) {

    var selectedText = encodeURIComponent(info.selectionText);

    chrome.storage.sync.get('selectedEngine', function (data) {
      var searchUrl = data.selectedEngine + selectedText;

      chrome.tabs.create({ url: searchUrl });
    });

    chrome.storage.sync.get('searchHistory', function (data) {
      var history = data.searchHistory;
      history.push(info.selectionText);

      if (history.length > 1) {
        history.shift();
      }
      chrome.storage.sync.set({ 'searchHistory': history });
    });
  }
});






