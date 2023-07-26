const display = document.querySelector('.display');
let firstNumber = '';
let operator = '';
let secondNumber = '';

function updateDisplay() {
  display.textContent = firstNumber + operator + secondNumber;
}

function clearCalculator() {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  updateDisplay();
}

function backspace() {
  if (secondNumber !== '') {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator !== '') {
    operator = '';
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }
  updateDisplay();
}

function handleNumberClick(number) {
  if (operator === '') {
    firstNumber += number;
  } else {
    secondNumber += number;
  }
  updateDisplay();
}

function handleOperatorClick(selectedOperator) {
  if (firstNumber !== '') {
    operator = selectedOperator;
    updateDisplay();
  }
}

function calculateResult() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error: Cannot divide by zero';
    default:
      return '';
  }
}

function handleEqualClick() {
  if (operator !== '' && secondNumber !== '') {
    firstNumber = calculateResult().toString();
    operator = '';
    secondNumber = '';
    updateDisplay();
  }
}

function handleDecimalClick() {
  if (operator === '') {
    if (!firstNumber.includes('.')) {
      firstNumber += '.';
      updateDisplay();
    }
  } else {
    if (!secondNumber.includes('.')) {
      secondNumber += '.';
      updateDisplay();
    }
  }
}

document.querySelector('.clear').addEventListener('click', clearCalculator);
document.querySelector('.backspace').addEventListener('click', backspace);
document.querySelectorAll('.number').forEach(button =>
  button.addEventListener('click', () => handleNumberClick(button.dataset.number))
);
document.querySelectorAll('.operator').forEach(button =>
  button.addEventListener('click', () => handleOperatorClick(button.dataset.operator))
);
document.querySelector('.equal').addEventListener('click', handleEqualClick);
document.querySelector('.decimal').addEventListener('click', handleDecimalClick);

// Initialize display with dummy number
updateDisplay();
