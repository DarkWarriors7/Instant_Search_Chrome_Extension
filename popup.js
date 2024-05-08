document.addEventListener('DOMContentLoaded', function () {
  var searchEngineSelect = document.getElementById('searchEngine');
  var showHistoryBtn = document.getElementById('showHistoryBtn');
  var historyList = document.getElementById('historyList');


  function showHistory() {
    chrome.storage.sync.get('searchHistory', function (data) {
      var history = data.searchHistory;
      if (history.length > 0) {
        showHistoryBtn.style.display = 'none';
        historyList.innerHTML = '';
        history.forEach(function (item) {
          var listItem = document.createElement('p');
          var words = item.split(' ');
          var displayText = words.slice(0, 10).join(' ');

          if (words.length > 10) {
            displayText += ' ...';
          }
          listItem.textContent = 'Last search : ' + displayText;
          historyList.appendChild(listItem);
        });
        historyList.style.display = 'block';
      } else {

        showHistoryBtn.style.display = 'none';
        var listItem = document.createElement('p');
        listItem.textContent = "You haven't searched anything yet. Please select and search!!!";
        historyList.appendChild(listItem);
        historyList.style.display = 'block';

      }
    });
  }


  searchEngineSelect.addEventListener('change', function () {
    var selectedEngine = searchEngineSelect.value;
    chrome.storage.sync.set({ 'selectedEngine': selectedEngine }, function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  });


  showHistoryBtn.addEventListener('click', showHistory);


  chrome.storage.sync.get('selectedEngine', function (data) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }
    if (data.selectedEngine) {
      searchEngineSelect.value = data.selectedEngine;
    }
  });

});

