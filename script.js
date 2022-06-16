window.onload = init;

function init() {
  let digits = document.querySelectorAll(".digit");
  digits.forEach((digit) => digit.addEventListener("click", onDigitClick));

  let operators = document.querySelectorAll(".operator");
  operators.forEach((operator) =>
    operator.addEventListener("click", onOperatorClick)
  );

  let backspace = document.querySelector(".backspace");
  backspace.addEventListener("click", onBackspaceClick);

  let equals = document.querySelector(".equals");
  equals.addEventListener("click", onEqualsClick);

  let clear = document.querySelector(".clear");
  clear.addEventListener("click", onClearClick);

  window.addEventListener("keydown", onKeyboardInput);
}

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

const operation = {
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

function onDigitClick(e) {
  let digit = e.type == "keydown" ? e.key : e.target.textContent;

  updateOperand(digit);
  updateDisplay();
}

function updateOperand(digit) {
  // Allow only one decimal point in an operand
  if (digit == ".") {
    if (operation[operation.current].includes(".")) return;
  }
  operation[operation.current] += digit;
}

function onOperatorClick(e) {
  let operator = e.type == "keydown" ? e.key : e.target.textContent;

  // Do nothing if the left operand isn't set
  if (operation.left == "") return;

  // Calculate the result if the right operand is already set
  if (operation.right != "") onEqualsClick();

  updateOperator(operator);
  resetOperatorButtonStyles();
  styleOperatorButton();
}

function styleOperatorButton(e) {
  let operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => {
    console.log(operator.textContent);
    if (operator.textContent == operation.operator) {
      operator.style.backgroundColor = "red";
    }
  });
}

function resetOperatorButtonStyles() {
  let operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => (operator.style.backgroundColor = "white"));
}

function updateOperator(operator) {
  // Switch current operand from left to right
  operation.current = "right";
  operation.operator = operator;
}

function onEqualsClick() {
  // Execute only if both operands are set
  if (operation.left != "" && operation.right != "") {
    result = operation.operate();
    resetOperation();
    resetOperatorButtonStyles();
    operation.left = `${result == Infinity ? "DIV BY 0 ERROR" : result}`;
    updateDisplay();
  }
}

function onBackspaceClick() {
  // Do nothing if only left and operator are set
  if (operation.operator == null || operation.right != "") {
    operation[operation.current] = operation[operation.current].slice(0, -1);
    updateDisplay();
  }
}

function updateDisplay(mode) {
  let displayBox = document.querySelector(".display-box");
  let output = operation[operation.current];

  displayBox.textContent =
    mode == "clear"
      ? ""
      : output.slice(-5) == "ERROR"
      ? output
      : `${output.length > 12 ? "TOO LARGE" : output}`;
}

function onClearClick() {
  resetOperation();
  resetOperatorButtonStyles();
  updateDisplay("clear");
}

function resetOperation() {
  operation.left = "";
  operation.right = "";
  operation.current = "left";
  operation.operator = null;
}

function onKeyboardInput(e) {
  let operators = ["/", "*", "+", "-"];
  let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

  if (operators.includes(e.key)) onOperatorClick(e);
  if (digits.includes(e.key)) onDigitClick(e);
  if (e.key == "Backspace") onBackspaceClick(e);
  if (e.key == "Enter") onEqualsClick(e);
  if (e.key == "Delete") onClearClick(e);
}
