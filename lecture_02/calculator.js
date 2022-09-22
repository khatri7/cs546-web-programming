const isNumber = (val, varName) => {
  if (typeof val !== "number") throw `${varName} is not a number`;
};

const addTwoNumbers = (num1, num2) => {
  isNumber(num1, "First Input");
  isNumber(num2, "Second Input");
  return num1 + num2;
};

const subtractNumber = (num1, num2) => {
  isNumber(num1, "First Input");
  isNumber(num2, "Second Input");
  return num1 - num2;
};

const multiplyTwoNumbers = (num1, num2) => {
  isNumber(num1, "First Input");
  isNumber(num2, "Second Input");
  return num1 * num2;
};

const divideNumber = (num1, num2) => {
  isNumber(num1, "First Input");
  isNumber(num2, "Second Input");
  if (num2 === 0) throw "Denominator cannot be 0";
  return num1 / num2;
};

module.exports = {
  description: "This is a calculator for CS-546",
  addTwoNumbers,
  subtractNumber,
  multiplyTwoNumbers,
  divideNumber,
};
