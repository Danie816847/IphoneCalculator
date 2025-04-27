let display = document.getElementById("inputDisplay");
let currentInput = '';
let resultDisplayed = false;

function input(val) {
    if (resultDisplayed) {
        if (isNaN(val)) {
            currentInput += val; // Append the operator to the result
        } else {
            currentInput = val; // Start a new calculation
        }
        resultDisplayed = false;
    } else {
        currentInput += val; // Append the value to the current input
    }
    display.textContent = currentInput; // Update the display
}

function clearDisplay() {
    currentInput = '';
    display.textContent = '0';
    resultDisplayed = false; // Reset the resultDisplayed flag
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
        let result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
        display.textContent = result; 
        currentInput = result.toString(); 
        resultDisplayed = true; 
    } catch (e) {
        display.textContent = 'Error'; 
        currentInput = ''; 
        resultDisplayed = false; 
    }
}
