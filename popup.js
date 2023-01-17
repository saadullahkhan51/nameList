document.getElementById('convert-button').addEventListener('click', function () {
  const language = document.getElementById('language').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: 'convert_code_naming_conventions', language: language });
  });
});

chrome.storage.local.get(['wordDict'], function (result) {
  var wordDict = result.wordDict;
  var table = document.getElementById("myTable");
  table.innerHTML = `<tr> <th>Current</th> <th>New</th> </tr>`;
  for (var key in wordDict) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = wordDict[key];
  }
});
