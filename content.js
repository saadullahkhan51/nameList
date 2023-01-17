chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'convert_code_naming_conventions') {
    const codeElements = document.querySelectorAll('code');
    const codeTexts = [...codeElements].map(codeElement => codeElement.textContent);
    const highlightedWords = [...new Set(codeTexts.join(" ").split(" "))];
    const lang = request.language;
    const wordDict = Object.fromEntries(highlightedWords.filter(word => {
      let replacedWord = lang === 'python' ? word.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase() : word.replace(/(_)(.)/g, (match, _, character) => character.toUpperCase());
      return word !== replacedWord;
    }).map(word => {
      let replacedWord = lang === 'python' ? word.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase() : word.replace(/(_)(.)/g, (match, _, character) => character.toUpperCase());
      return [word, replacedWord];
    }));    
    chrome.storage.local.set({ wordDict: wordDict }, function () {
      console.log('wordDict is stored');
    });
  }
});
