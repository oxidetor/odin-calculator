let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let operation = {
  current: "left",
  left: "",
  operator: null,
  right: "",
  operate() {
    switch (this.operator) {
      case "+":
        return add(+this.left, +this.right);
      case "-":
        return subtract(+this.left, +this.right);
      case "*":
        return multiply(+this.left, +this.right);
      case "/":
        return divide(+this.left, +this.right);
      default:
        break;
    }
  },
};

let digits = document.querySelectorAll(".digit");
digits.forEach((digit) => digit.addEventListener("click", onDigitClick));

function onDigitClick(e) {
  updateOperand(e.target.textContent);
  updateDisplay("operation");
}

function updateOperand(digit) {
  operation[operation.current] += digit;
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
  operator.addEventListener("click", onOperatorClick)
);

function onOperatorClick(e) {
  // Do nothing if the left operand isn't set
  if (operation.left == "") return;

  // Calculate the result if the right operand is already set
  if (operation.right != "") onEqualsClick();

  updateOperator(e.target.textContent);
  updateDisplay("operation");
}

function updateOperator(operator) {
  // Switch current operand from left to right
  operation.current = "right";
  operation.operator = operator;
}

let equals = document.querySelector(".equals");
equals.addEventListener("click", onEqualsClick);

function onEqualsClick() {
  // Execute only if both operands are set
  if (operation.left != "" && operation.right != "") {
    result = operation.operate();
    resetOperation();
    operation.left = `${result}`;
    updateDisplay("result");
  }
}

function updateDisplay(mode) {
  let displayBox = document.querySelector(".display-box");
  let left = operation.left;
  let right = operation.right;
  let operator = operation.operator;
  if (mode == "operation") {
    displayBox.textContent = `${left}${operator ? " " + operator + " " : ""}${
      right ? " " + right + " " : ""
    }`;
  }
  if (mode == "result") {
    displayBox.textContent = left;
  }
  if (mode == "clear") {
    displayBox.textContent = "";
  }
}

let clear = document.querySelector(".clear");
clear.addEventListener("click", resetOperation);

function resetOperation() {
  operation.left = "";
  operation.current = "left";
  operation.operator = null;
  operation.right = "";

  updateDisplay("clear");
}
