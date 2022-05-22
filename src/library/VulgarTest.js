const fs = require('fs');
const path = require('path');

function getVulgarWords() {
	return fs.readFileSync(path.join(__dirname, './vulgar.txt'), 'ascii').split('\n');
}

function formatString(input) {
	const lowercase = input.toLowerCase();

	return lowercase.replace.replace(/\$/g, 's').replace(/\@/g, 'a');
}

function detectVulgarWords(input) {
	const formatted = formatString(input);
	const vulgarWords = getVulgarWords();

	return vulgarWords.some((vulgarWord) => formatted.includes(vulgarWord));
}

module.exports = {
	formatString,
	detectVulgarWords,
};
