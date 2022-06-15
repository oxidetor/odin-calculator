let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let operation = {
  current_operand: "left",
  left_operand: "",
  operator: null,
  right_operand: "",
  operate() {
    switch (this.operator) {
      case "+":
        return add(+this.left_operand, +this.right_operand);
      case "-":
        return subtract(+this.left_operand, +this.right_operand);
      case "*":
        return multiply(+this.left_operand, +this.right_operand);
      case "/":
        return divide(+this.left_operand, +this.right_operand);
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

  if (operation.current_operand == "left") {
    operation.left_operand += digit;
  } else {
    operation.right_operand += digit;
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

  if (operation.left_operand == "") return;
  operation.current_operand = "right";
  operation.operator = operator;

  displayOperation();

  console.table(operation);
}

let equals = document.querySelector(".equals");
equals.addEventListener("click", onEqualsClick);

function onEqualsClick(e) {
  if (operation.left_operand != "" && operation.right_operand != "") {
    result = operation.operate();
    displayResult(result);
    operation.left_operand = `${result}`;
    operation.right_operand = "";
    operation.current_operand = "left";
  }
  console.table(operation);
}

function displayResult() {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = result;
}

function displayOperation() {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = `${operation.left_operand}${
    operation.operator != null ? " " + operation.operator + " " : ""
  }${operation.right_operand != "" ? " " + operation.right_operand + " " : ""}`;
}
