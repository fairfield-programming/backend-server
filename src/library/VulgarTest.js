const fs = require("fs");
const path = require("path");

function getVulgarWords() {
  // Get the File Data
  const fileData = fs.readFileSync(path.join(__dirname, "./vulgar.txt"), "ascii");
  return fileData.split("\n");
}

function TokenizeString(input) {
  const lowercase = input.toLowerCase();

  // Switch Around Similar Looking Symbols
  let partsRemoved = lowercase;
  partsRemoved = partsRemoved.replace(/\$/g, "s");
  partsRemoved = partsRemoved.replace(/\@/g, "a");

  return partsRemoved;
}

function DetectVulgarWords(input) {
  const tokenizedString = TokenizeString(input);
  const vulgarWords = getVulgarWords();

  for (let i = 0; i < vulgarWords.length; i += 1) {
    const word = vulgarWords[i];
    if (tokenizedString.includes(word)) return true;
  }

  return false;
}

module.exports = {
  TokenizeString,
  DetectVulgarWords,
};
