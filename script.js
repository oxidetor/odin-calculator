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
  displayOperation();
  console.table(operation);
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
  displayOperation();

  console.table(operation);
}

function updateOperator(operator) {
  operation.current = "right";
  operation.operator = operator;
}

let equals = document.querySelector(".equals");
equals.addEventListener("click", onEqualsClick);

function onEqualsClick() {
  if (operation.left != "" && operation.right != "") {
    result = operation.operate();
    displayResult(result);
    operation.left = `${result}`;
    operation.right = "";
    operation.current = "left";
    operation.operator = null;
  }
  console.table(operation);
}

function displayResult() {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = result;
}

function displayOperation() {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = `${operation.left}${
    operation.operator != null ? " " + operation.operator + " " : ""
  }${operation.right != "" ? " " + operation.right + " " : ""}`;
}

let clear = document.querySelector(".clear");
clear.addEventListener("click", onClearClick);

function onClearClick(e) {
  operation.left = "";
  operation.current = "left";
  operation.operator = null;
  operation.right = "";

  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = "";

  console.table(operation);
}
