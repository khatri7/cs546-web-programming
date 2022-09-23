/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

const isValidObject = (obj) =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      if (
        (Array.isArray(arr1[i]) &&
          Array.isArray(arr2[i]) &&
          compareArrays(arr1[i], arr2[i])) ||
        (isValidObject(arr1[i]) &&
          isValidObject(arr2[i]) &&
          deepEquality(arr1[i], arr2[i]))
      )
        continue;
      return false;
    }
  }
  return true;
};

const deepEquality = (obj1, obj2) => {
  if (obj1 === undefined || obj2 === undefined)
    throw "Two objects should be provided as input parameters";
  if (!isValidObject(obj1) || !isValidObject(obj2))
    throw "Input parameters should be objects";
  const obj1keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1keys.length !== obj2keys.length) return false;
  for (let key of obj1keys) {
    if (obj1[key] !== obj2[key]) {
      if (
        (Array.isArray(obj1[key]) &&
          Array.isArray(obj2[key]) &&
          compareArrays(obj1[key], obj2[key])) ||
        (isValidObject(obj1[key]) &&
          isValidObject(obj2[key]) &&
          deepEquality(obj1[key], obj2[key]))
      )
        continue;
      return false;
    }
  }
  return true;
};

const commonKeysValues = (obj1, obj2) => {
  if (obj1 === undefined || obj2 === undefined)
    throw "Two objects should be provided as input parameters";
  if (!isValidObject(obj1) || !isValidObject(obj2))
    throw "Input parameter should be objects";
  let commonKeys = {};
  Object.keys(obj1).forEach((key) => {
    if (
      obj1[key] === obj2[key] ||
      (Array.isArray(obj1[key]) &&
        Array.isArray(obj2[key]) &&
        compareArrays(obj1[key], obj2[key]))
    )
      commonKeys = {
        ...commonKeys,
        [key]: obj1[key],
      };
    else if (isValidObject(obj1[key]) && isValidObject(obj2[key])) {
      if (deepEquality(obj1[key], obj2[key]))
        commonKeys = {
          ...commonKeys,
          [key]: obj1[key],
        };
      commonKeys = {
        ...commonKeys,
        ...commonKeysValues(obj1[key], obj2[key]),
      };
    }
  });
  return commonKeys;
};

const calculateObject = (object, func) => {
  if (!isValidObject(object)) throw "First input parameter should be an object";
  if (typeof func !== "function")
    throw "Second input parameter should be a function";
  const objKeys = Object.keys(object);
  if (!objKeys.length)
    throw "Object provided cannot be empty. Should have number values";
  objKeys.forEach((key) => {
    if (typeof object[key] !== "number" || !isFinite(object[key]))
      throw `Value of key ${key} in the object provided is not a number`;
    const funcResult = func(object[key]);
    if (typeof funcResult !== "number" || !isFinite(funcResult))
      throw "Function provided in input parameter should return a value of type number";
    object[key] = parseFloat(Math.sqrt(funcResult).toFixed(2));
  });
  return object;
};

module.exports = {
  compareArrays,
  deepEquality,
  commonKeysValues,
  calculateObject,
};
