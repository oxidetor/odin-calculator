function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      break;
  }
}

let digits = document.querySelectorAll(".digit");
let displayedValues = [];

digits.forEach((digit) => digit.addEventListener("click", onDigitClick));

function onDigitClick(e) {
  let digit = e.target.textContent;
  console.log(e.target.textContent);
  displayDigit(digit);
  displayedValues.push(digit);
  console.log(displayedValues);
}

function displayDigit(digit) {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent += digit;
}
