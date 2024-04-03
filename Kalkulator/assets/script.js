let operators = ["+", "-", "/", "*"];

let box = null;
let lastOperationHistory = null;
let operator = null;
let equal = null;
let dot = null;

let firstNum = true;

let numbers = [];
let operatorValue;
let lastButton;
let calcOperator;

let total;

let keyCombination = [];

function buttonNumber(button) {
  operator = document.getElementsByClassName("operator");
  box = document.getElementById("box");
  lastOperationHistory = document.getElementById("last-operation");
  equal = document.getElementById("equal_sign").value;
  dot = document.getElementById("dot").value;

  lastButton = button;

  if (!operators.includes(button) && button != equal) {
    if (firstNum) {
      if (button == dot) {
        box.innerText = "0" + dot;
      } else {
        box.innerText = button;
      }
      firstNum = false;
    } else {
      if (box.innerText.length == 1 && box.innerText == 0) {
        if (button == dot) {
          box.innerText += button;
        }
        return;
      }
      if (box.innerText.includes(dot) && button == dot) {
        return;
      }
      if (box.innerText.length == 20) {
        return;
      }

      if (button == dot && box.innerText == "-") {
        box.innerText = "-0" + dot;
      } else {
        box.innerText += button;
      }
    }
  } else {
    if (operatorValue != null && button == operatorValue) {
      return;
    }

    if (button == "-" && box.innerText == 0) {
      box.innerText = button;
      firstNum = false;
      operatorValue = button;
      showSelectedOperator();
      return;
    } else if (operators.includes(button) && box.innerText == "-") {
      return;
    } else if (
      button == "-" &&
      operatorValue == "-" &&
      lastOperationHistory.innerText.includes("=")
    ) {
      return;
    }

    if (operators.includes(button)) {
      if (typeof lastOperator != "undefined" && lastOperator != null) {
        calcOperator = lastOperator;
      } else {
        calcOperator = button;
      }
      if (button == "*") {
        lastOperator = "×";
      } else if (button == "/") {
        lastOperator = "÷";
      } else {
        lastOperator = button;
      }
      operatorValue = button;
      firstNum = true;
      showSelectedOperator();
    }

    if (numbers.length == 0) {
      numbers.push(box.innerText);
      if (typeof lastOperator != "undefined" && lastOperator != null) {
        lastOperationHistory.innerText = box.innerText + " " + lastOperator;
      }
    } else {
      if (numbers.length == 1) {
        numbers[1] = box.innerText;
      }
      let tempNum = box.innerText;

      if (button == equal && calcOperator != null) {
        let total = calculate(numbers[0], numbers[1], calcOperator);
        box.innerText = total;

        if (!lastOperationHistory.innerText.includes("=")) {
          lastOperationHistory.innerText += " " + numbers[1] + " =";
        }

        tempNum = numbers[0];

        numbers[0] = total;
        operatorValue = null;
        showSelectedOperator();

        let historyArr = lastOperationHistory.innerText.split(" ");
        historyArr[0] = tempNum;
        lastOperationHistory.innerText = historyArr.join(" ");
      } else if (calcOperator != null) {
        lastOperationHistory.innerText = tempNum + " " + lastOperator;
        calcOperator = button;
        numbers = [];
        numbers.push(box.innerText);
      }
    }
  }
}

function showSelectedOperator() {
  let elements = document.getElementsByClassName("operator");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "blue";
  }

  if (operatorValue == "+") {
    document.getElementById("plusOp").style.backgroundColor = "blue";
  } else if (operatorValue == "-") {
    document.getElementById("subOp").style.backgroundColor = "blue";
  } else if (operatorValue == "*") {
    document.getElementById("multiOp").style.backgroundColor = "blue";
  } else if (operatorValue == "/") {
    document.getElementById("divOp").style.backgroundColor = "blue";
  }
}

function calculate(num1, num2, operator) {
  if (operator === "+") {
    total = parseFloat(num1) + parseFloat(num2);
  } else if (operator === "-") {
    total = parseFloat(num1) - parseFloat(num2);
  } else if (operator === "*") {
    total = parseFloat(num1) * parseFloat(num2);
  } else if (operator === "/") {
    total = parseFloat(num1) / parseFloat(num2);
  } else {
    if (total == box.innerText) {
      return total;
    } else {
      return box.innerText;
    }
  }
  if (!Number.isInteger(total)) {
    total = total.toPrecision(12);
  }
  return parseFloat(total);
}

function buttonClear() {
  window.location.reload();
}

function backspaceRemove() {
  box = document.getElementById("box");
  let elements = document.getElementsByClassName("operator");

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "blue";
  }

  let lastNum = box.innerText;
  lastNum = lastNum.slice(0, -1);

  box.innerText = lastNum;

  if (box.innerText.length == 0) {
    box.innerText = 0;
    firstNum = true;
  }
}


function calculatePercentage() {
  let elements = document.getElementsByClassName("operator");
  box = document.getElementById("box");

  if (numbers.length > 0 && typeof lastOperator != "undefined") {
    let percValue = (box.innerText / 100) * numbers[0];
    if (!Number.isInteger(percValue)) {
      percValue = percValue.toFixed(2);
    }
    box.innerText = percValue;
    numbers.push(box.innerText);

    if (!lastOperationHistory.innerText.includes("=")) {
      lastOperationHistory.innerText += " " + numbers[1] + " =";
    }
  } else {
    box.innerText = box.innerText / 100;
  }

  numbers.push(box.innerText);
  let res = calculate(numbers[0], numbers[1], lastOperator);
  box.innerText = res;
  operatorValue = "=";

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "red";
  }
}

function clearEntry() {
  box = document.getElementById("box");

  if (numbers.length > 0 && typeof lastOperator != "undefined") {
    box.innerText = 0;
    let temp = numbers[0];
    numbers = [];
    numbers.push(temp);
    firstNum = true;
  }
}
