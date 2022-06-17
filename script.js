window.onload = init;

function init() {
  let buttons = document.querySelectorAll(".button");
  let digits = document.querySelectorAll(".digit");
  let operators = document.querySelectorAll(".operator");
  let backspace = document.querySelector(".backspace");
  let equals = document.querySelector(".equals");
  let clear = document.querySelector(".clear");
  let displayBox = document.querySelector(".display-box");

  displayBox.textContent = "HELLO";

  digits.forEach((digit) => digit.addEventListener("click", onDigitClick));

  operators.forEach((operator) =>
    operator.addEventListener("click", onOperatorClick)
  );

  backspace.addEventListener("click", onBackspaceClick);

  equals.addEventListener("click", onEqualsClick);

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
      case "×":
        return multiply(+this.left, +this.right);
      case "÷":
        return divide(+this.left, +this.right);
      default:
        break;
    }
  },
};

function onDigitClick(e) {
  console.log(e.target);
  let digit = e.type == "keydown" ? e.key : e.target.textContent;
  if (operation[operation.current].length < 9) {
    updateOperand(digit);
    updateDisplay();
  }
}

function updateOperand(digit) {
  // Allow only one decimal point in an operand
  if (digit == ".") {
    if (operation[operation.current].includes(".")) return;
  }
  operation[operation.current] += digit;
}

function onOperatorClick(e) {
  let operator =
    e.type == "keydown"
      ? e.key == "*"
        ? "×"
        : e.key == "/"
        ? "÷"
        : e.key
      : e.target.textContent;

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
    if (operator.textContent == operation.operator) {
      operator.style.backgroundColor = "aqua";
    }
  });
}

function resetOperatorButtonStyles() {
  let operators = document.querySelectorAll(".operator");
  operators.forEach(
    (operator) => (operator.style.backgroundColor = "lightskyblue")
  );
}

function updateOperator(operator) {
  // Switch current operand from left to right
  operation.current = "right";
  operation.operator = operator;
}

function onEqualsClick() {
  let displayBox = document.querySelector(".display-box");

  // Execute only if both operands are set
  if (operation.left != "" && operation.right != "") {
    result = operation.operate();
    resetOperation();
    resetOperatorButtonStyles();
    displayBox.classList.add("pressed");

    if (result == Infinity || result == -Infinity) {
      updateDisplay("error");
      return;
    } else if (result.toString().length > 9) {
      let precision = 9;
      if (result.toPrecision(precision).includes("-")) precision--;
      if (result.toPrecision(precision).includes(".")) precision--;
      if (result.toPrecision(precision).includes("e+")) {
        precision =
          --precision -
          (result.toPrecision(precision).length -
            result.toPrecision(precision).indexOf("+"));
      }
      operation.left = `${result.toPrecision(precision)}`;
    } else {
      operation.left = `${result}`;
    }
    updateDisplay();
  }
}

function onBackspaceClick() {
  // Do nothing if only left and operator are set
  if (operation.operator == null || operation.right != "") {
    // Backspace removes positive exponent term
    if (operation[operation.current].slice(-2, -1) == "+") {
      operation[operation.current] = operation[operation.current].slice(0, -2);
    }

    // Backspace removes negative exponent term
    if (operation[operation.current].slice(-2, -1) == "-") {
      operation[operation.current] = operation[operation.current].slice(0, -2);
    }

    // Backspace removes decimal point
    if (operation[operation.current].slice(-2, -1) == ".") {
      operation[operation.current] = operation[operation.current].slice(0, -1);
    }

    operation[operation.current] = operation[operation.current].slice(0, -1);
    updateDisplay();
  }
}

function updateDisplay(mode) {
  let displayBox = document.querySelector(".display-box");
  let output = operation[operation.current];

  displayBox.textContent =
    mode == "clear" ? "" : mode == "error" ? "*ERROR*" : `${output}`;
}

function displayMessage(message) {
  let displayBox = document.querySelector(".display-box");
  displayBox.textContent = message;
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
