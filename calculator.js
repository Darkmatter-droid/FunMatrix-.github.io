// Get the display element
const display = document.getElementById('display');

// Get all buttons
const buttons = document.querySelectorAll('.button');

// Initialize variables
let currentInput = '';
let previousInput = '';
let operator = null;
let operatorSymbol = '';

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonId = button.id;

        // Handle clear button
        if (buttonId === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            operatorSymbol = '';
            updateDisplay('');
        }
        // Handle plus-minus button
        else if (buttonId === 'plus-minus') {
            currentInput = currentInput ? String(-parseFloat(currentInput)) : '';
            updateDisplay(previousInput + operatorSymbol + currentInput);
        }
        // Handle percentage button
        else if (buttonId === 'percentage') {
            currentInput = currentInput ? String(parseFloat(currentInput) / 100) : '';
            updateDisplay(previousInput + operatorSymbol + currentInput);
        }
        // Handle operators
        else if (['division', 'multipication', 'minus', 'plus'].includes(buttonId)) {
            if (currentInput) {
                if (operator) {
                    // Calculate intermediate result for chained operations
                    const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                    previousInput = String(result);
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = buttonId; // Store the operator
                operatorSymbol = getOperatorSymbol(buttonId);
                updateDisplay(previousInput + operatorSymbol + currentInput);
            } else if (previousInput && operator) {
                // Change operator without current input
                operator = buttonId;
                operatorSymbol = getOperatorSymbol(buttonId);
                updateDisplay(previousInput + operatorSymbol + currentInput);
            }
        }
        // Handle equal button
        else if (buttonId === 'equal') {
            if (previousInput && currentInput && operator) {
                const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                currentInput = String(result);
                previousInput = '';
                operator = null;
                operatorSymbol = '';
                updateDisplay(currentInput);
            }
        }
        // Handle number and decimal buttons
        else {
            if (buttonId === '.' && currentInput.includes('.')) {
                return; // Prevent multiple decimals
            }
            currentInput += button.textContent;
            updateDisplay(previousInput + operatorSymbol + currentInput);
        }
    });
});

// Update the display
function updateDisplay(value) {
    display.value = value;
}

// Perform calculations
function calculate(num1, num2, operator) {
    switch (operator) {
        case 'division':
            return num2 !== 0 ? num1 / num2 : 'Error'; // Handle division by zero
        case 'multipication':
            return num1 * num2;
        case 'minus':
            return num1 - num2;
        case 'plus':
            return num1 + num2;
        default:
            return num2;
    }
}

// Get operator symbol
function getOperatorSymbol(op) {
    switch (op) {
        case 'plus':
            return '+';
        case 'minus':
            return '-';
        case 'multipication':
            return '×';
        case 'division':
            return '÷';
        default:
            return '';
    }
}