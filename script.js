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
  let digit = e.target.textContent;
  console.log(digit);

  if (operation.current == "left") {
    operation.left += digit;
  } else {
    operation.right += digit;
  }

  displayOperation();
  console.table(operation);
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
  operator.addEventListener("click", onOperatorClick)
);

function onOperatorClick(e) {
  let operator = e.target.textContent;

  if (operation.left == "") return;

  if (operation.right != "") onEqualsClick();
  operation.current = "right";
  operation.operator = operator;

  displayOperation();

  console.table(operation);
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
  }
  console.table(operation);
}

function displayResult() {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = result.toFixed(6);
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
