const fs = require('fs');
const path = require('path');

function GetVulgarWords() {

    // Get the File Data
    var fileData = fs.readFileSync(path.join(__dirname, './vulgar.txt'), 'ascii');
    var wordArray = fileData.split('\n');

    // Return the Words
    return wordArray;

}

function TokenizeString(input) {

    // Make it Lowercase
    var lowercase = input.toLowerCase();

    // Switch Around Similar Looking Symbols
    var partsRemoved = lowercase;
    partsRemoved = partsRemoved.replace(/\$/g, 's');

    // Return the Final Result
    return partsRemoved;

}

function DetectVulgarWords(input) {

    // Tokenize the Input String
    var tokenizedString = TokenizeString(input);
    var vulgarWords = GetVulgarWords();

    for (var i = 0; i < vulgarWords.length; i++) {

        

    }

    // Return False if Nothing Detected
    return false;

}

module.exports = {
    GetVulgarWords,
    TokenizeString,
    DetectVulgarWords
};