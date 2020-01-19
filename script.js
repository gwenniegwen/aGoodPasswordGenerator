
let clipboard = document.getElementById('clipboard');
let generate = document.getElementById('generate');
let lengthEl = document.getElementById('length');
let lowercase = document.getElementById('lowercase');
let numbers = document.getElementById('numbers');
let result = document.getElementById('result');
let symbols = document.getElementById('symbols');
let uppercase = document.getElementById('uppercase');


function getLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
	let symbols = '!@#$%^&*(~){}[]<=>/,.?'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

let randomFunc = {
	lower: getLower,
	number: getNumber,
	symbol: getSymbol,
	upper: getUpper,
};


clipboard.addEventListener('click', () => {
	let textarea = document.createElement('textarea');
	let password = result.innerText;

	if (!password) { return; }

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Success! Password Has Copied To Clipboard!');
});


generate.addEventListener('click', () => {
	let length = +lengthEl.value;
	let hasLower = lowercase.checked;
	let hasNumber = numbers.checked;
	let hasSymbol = symbols.checked;
	let hasUpper = uppercase.checked;

	result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	let typesCount = lower + upper + number + symbol;
	let typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

	if (typesCount === 0) {
		return '';
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			let funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
}


let finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

