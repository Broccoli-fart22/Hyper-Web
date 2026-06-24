
const passwordDisplay = document.getElementById('password');
const copyButton = document.getElementById('copy');
const generateButton = document.getElementById('generate');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const lengthInput = document.getElementById('length');

function generatePassword() {
    const length = parseInt(lengthInput.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '"@#$%^&*()_+~`|}{[]\:;?><,./-=';

    let allowedChars = '';
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    let password = '';
    if (allowedChars.length === 0) return;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordDisplay.value = password;
}

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', () => {
    passwordDisplay.select();
    document.execCommand('copy');
});