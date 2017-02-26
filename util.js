function shimConsole(element) {
	if (!window.console) {
		window.console = {
			log: function () {}
		}
	}

	const originalLog = window.console.log.bind(window.console);
	window.console.log = function () {
		originalLog.apply(null, arguments);

		const row = document.createElement('pre');
		row.innerText = Array.prototype.join.call(arguments, ' ');
		element.appendChild(row);
	};
}

const ENGLISH = 'abcdefghijklmnopqrstuvwxyz';
function createAlienLanguage() {
	const alien = ENGLISH.split('');
	alien.sort((a, b) => 0.5 - Math.random());
	return alien.join('');
}

function translateToAlien(words, alienLanguage) {
	const lookup = {};
	for (let i = 0; i < ENGLISH.length; i++) {
		lookup[ENGLISH[i]] = alienLanguage[i];
	}

	return words.map(word => {
		return word
			.split('')
			.map(englishLetter => lookup[englishLetter])
			.join('');
	});
}

function test(description, alienLanguage, words) {
	const result = order(words);
	const correct = alienLanguage.split('').filter(letter => result.indexOf(letter) >= 0).join('') === result;
	
	console.log(`${description}: `);
	console.log(`${correct ? 'OK ' : ' X '}      ${result}  <--  ${alienLanguage}`);
}

function testTranslated(description, alienLanguage, words) {
	const alienWords = translateToAlien(words, alienLanguage);
	test(description, alienLanguage, alienWords);
}