/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
const { compareArrays } = require("./objectUtils");

const isValidArray = (
  arr,
  checkIfEmpty = false,
  arrLnCheckType,
  arrLnCheckAgainst = null
) => {
  if (typeof arr !== "object" || !Array.isArray(arr))
    throw "Input is not an array";
  if (checkIfEmpty && !arr.length) throw "Array is empty";
  if (
    arrLnCheckType &&
    arrLnCheckAgainst !== null &&
    typeof arrLnCheckAgainst === "number"
  ) {
    switch (arrLnCheckType) {
      case "min":
        if (arr.length < arrLnCheckAgainst)
          throw `Array length should be at least ${arrLnCheckAgainst}`;
        break;
      case "max":
        if (arr.length > arrLnCheckAgainst)
          throw `Array length cannot be more ${arrLnCheckAgainst}`;
        break;
      case "equal":
        if (arr.length !== arrLnCheckAgainst)
          throw `Array length should be ${arrLnCheckAgainst}`;
        break;
      default:
        break;
    }
  }
};

const arrayStats = (array) => {
  if (!array) throw "No input provided";
  isValidArray(array, true);
  let sum = 0;
  array.forEach((num, index) => {
    if (typeof num !== "number")
      throw `Value at index ${index} of array is not a number`;
    sum += num;
  });
  const sortedArr = array.sort((a, b) => a - b);
  const count = sortedArr.length;
  const mean = sum / count;
  const median =
    count % 2 === 0
      ? (sortedArr[count / 2] + sortedArr[count / 2 - 1]) / 2
      : sortedArr[Math.floor(count / 2)];
  const minimum = sortedArr[0];
  const maximum = sortedArr[count - 1];
  const range = maximum - minimum;
  let mode = 0;
  let tempMaxCount = 2;
  let counts = {};
  sortedArr.forEach((val) => {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] === tempMaxCount) {
      if (mode === 0) mode = val;
      else {
        if (Array.isArray(mode)) mode = [...mode, val];
        else mode = [mode, val];
      }
    }
    if (counts[val] > tempMaxCount) {
      mode = val;
      tempMaxCount = counts[val];
    }
  });

  return {
    mean,
    median,
    mode,
    range,
    minimum,
    maximum,
    count,
    sum,
  };
};

const makeObjects = (...arrays) => {
  try {
    isValidArray(arrays, true);
  } catch (e) {
    throw "No input parameters provided";
  }
  const obj = {};
  arrays.forEach((arrGrp, index) => {
    try {
      isValidArray(arrGrp, false, "equal", 2);
    } catch (e) {
      throw `Argument ${index + 1}: ${e}`;
    }
    obj[arrGrp[0]] = arrGrp[1];
  });
  return obj;
};

const commonElements = (...arrays) => {
  try {
    isValidArray(arrays, false, "min", 2);
  } catch (e) {
    throw "There should be at least 2 input arrays provided";
  }
  arrays.forEach((arr, index) => {
    try {
      isValidArray(arr, true);
    } catch (e) {
      throw `Argument ${index + 1}: ${e}`;
    }
  });
  const commonElements = [];
  const sortedArgs = arrays.sort((a, b) => a.length - b.length);
  sortedArgs[0].forEach((val) => {
    if (Array.isArray(val)) {
      let foundInOtherArr = false;
      for (let i = 1; i < sortedArgs.length; i++) {
        for (let j = 0; j < sortedArgs[i].length; j++) {
          if (
            Array.isArray(sortedArgs[i][j]) &&
            compareArrays(sortedArgs[i][j], val)
          ) {
            foundInOtherArr = true;
            break;
          } else foundInOtherArr = false;
        }
        if (!foundInOtherArr) break;
      }
      if (foundInOtherArr) commonElements.push(val);
    } else
      for (let i = 1; i < sortedArgs.length; i++) {
        if (!sortedArgs[i].includes(val)) continue;
        if (!commonElements.includes(val)) commonElements.push(val);
      }
  });

  return commonElements;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements,
};
