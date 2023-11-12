let valueDisplay = "0";
let secondValue = "0";
let operatorID = null;
let valuePass = false;

const buttons = document.getElementsByClassName("btn");

document.getElementById("display").innerHTML = valueDisplay;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", btnPress, this);
}

function btnPress(e) {
  let value = e.target.innerText;
  let operator = e.target.classList[1];

  if (operator == "number") pressNumber(value);
  if (operator == "function") pressFunction(value);
  if (operator == "operator") pressOperator(e);
}

function pressNumber(value) {
  if (valuePass) {
    secondValue = valueDisplay;
    valueDisplay = "0";
    valuePass = false;
  }

  if (valueDisplay === "0" && value != ".") {
    valueDisplay = value;
  } else if (value != ".") {
    valueDisplay = valueDisplay + value;
  } else if (!valueDisplay.includes(".")) {
    valueDisplay = valueDisplay + value;
  }

  document.getElementById("display").innerText = valueDisplay;
}

function pressOperator(e) {
  if (e.target.id != "equal") {
    if (operatorID != null)
      document.getElementById(operatorID).removeAttribute("selected");

    equal(e.target.id);
    e.target.setAttribute("selected", "");

    operatorID = e.target.id;
    valuePass = true;
    secondValue = "0";
  } else {
    equal(e.target.id);
    pressFunction("C");
  }
}

function pressFunction(value) {
  if (value === "AC") {
    valueDisplay = "0";
    secondValue = "0";
    valuePass = false;

    if (operatorID != null)
      document.getElementById(operatorID).removeAttribute("selected");

    operatorID = null;
  }
  if (value === "C") {
    secondValue = "0";
    valuePass = false;

    if (operatorID != null)
      document.getElementById(operatorID).removeAttribute("selected");

    operatorID = null;
  }

  if (value === "±") valueDisplay = -Number(valueDisplay);
  if (value === "%") valueDisplay = Number(valueDisplay) / 100;

  document.getElementById("display").innerText = valueDisplay;
}


function equal(operation) {
  if (operatorID === "plus") {
    valueDisplay = Number(valueDisplay) + Number(secondValue);
    document.getElementById("display").innerText = valueDisplay;
  }
  if (operatorID === "division") {
    valueDisplay = Number(secondValue) / Number(valueDisplay);
    document.getElementById("display").innerText = valueDisplay;
  }
  if (operatorID === "minus") {
    valueDisplay = Number(secondValue) - Number(valueDisplay);
    document.getElementById("display").innerText = valueDisplay;
  }
  if (operatorID === "multiplication") {
    valueDisplay = Number(valueDisplay) * Number(secondValue);
    document.getElementById("display").innerText = valueDisplay;
  }
}
