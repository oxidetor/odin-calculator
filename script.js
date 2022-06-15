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

let operation = {
  current_operand: "left",
  left_operand: "",
  operator: null,
  right_operand: "",
  operate() {
    switch (this.operator) {
      case "+":
        return add(this.left_operand, this.right_operand);
      case "-":
        return subtract(this.left_operand, this.right_operand);
      case "*":
        return multiply(this.left_operand, this.right_operand);
      case "/":
        return divide(this.left_operand, this.right_operand);
      default:
        break;
    }
  },
};

let digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", onDigitClick));

function onDigitClick(e) {
  let digit = e.target.textContent;
  console.log(digit);
  displayDigit(digit);

  if (operation.current_operand == "left") {
    operation.left_operand += digit;
  } else {
    operation.right_operand += digit;
  }

  console.table(operation);
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
  operator.addEventListener("click", onOperatorClick)
);

function onOperatorClick(e) {
  let operator = e.target.textContent;

  if (operation.left_operand == "") return;
  operation.current_operand = "right";
  operation.operator = operator;

  displayDigit(` ${operator} `);

  console.table(operation);
}

function displayDigit(digit) {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent += digit;
}
