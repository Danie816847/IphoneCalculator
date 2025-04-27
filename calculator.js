let display = document.getElementById("inputDisplay");
let currentInput = '';
let resultDisplayed = false;

function input(val) {
    if (resultDisplayed) {
        // If a result is displayed and the input is an operator, continue the calculation
        if (isNaN(val)) {
            currentInput += val; // Append the operator to the result
        } else {
            // If the input is a number, start a new calculation
            currentInput = val;
        }
        resultDisplayed = false;
    } else {
        currentInput += val; 
    }
    display.textContent = currentInput; 
}

function clearDisplay() {
    currentInput = '';
    display.textContent = '0';
    resultDisplayed = false; 
}

function toggleSign() {
    if (!currentInput) return;

    let match = currentInput.match(/(-?\d+\.?\d*)$/);
    if (match) {
        let number = match[0];
        let isNegative = number.startsWith('-');
        let toggled = isNegative
            ? `(${number.slice(1)})`
            : `(-${number})`;

        currentInput = currentInput.slice(0, -number.length) + toggled;
        currentInput = currentInput.replace(/\)\(/g, ')*(');
        display.textContent = currentInput;
    }
}

function calculate() {
    try {
        let sanitizedInput = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
        let result = eval(sanitizedInput);
        display.textContent = result;
        currentInput = result.toString();
        resultDisplayed = true; 
    } catch (e) {
        display.textContent = 'Error';
        currentInput = '';
        resultDisplayed = false;
    }
}
