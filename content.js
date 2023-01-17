chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'convert_code_naming_conventions') {

    const highlightedWords = [];
    var wordDict = {};
    const codeElements = document.querySelectorAll('code');

    codeElements.forEach(function (codeElement) {
      const codeText = codeElement.textContent;
      const words = codeText.split(' ');
      highlightedWords.push(...words);
    });

    let lang = request.language;
    highlightedWords.forEach(function (word) {
      if (lang == 'python') {
        wordDict[word] = word.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
      } else {
        wordDict[word] = word.replace(/(_)(.)/g, (match, _, character) => character.toUpperCase());
      }
    });
    console.log(wordDict);
    chrome.storage.local.set({ wordDict: wordDict }, function () {
      console.log('wordDict is stored');
    });
  }
});
