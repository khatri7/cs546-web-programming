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
  if (!isValidObject(obj1) || !isValidObject(obj2))
    throw "Input parameter should be objects";
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
  if (!isValidObject(obj1) || !isValidObject(obj2))
    throw "Input parameter should be objects";
  let commonKeys = {};
  const obj1keys = Object.keys(obj1).forEach((key) => {
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
    else if (
      isValidObject(obj1[key]) &&
      isValidObject(obj2[key]) &&
      deepEquality(obj1[key], obj2[key])
    )
      commonKeys = {
        ...commonKeys,
        [key]: obj1[key],
        ...commonKeysValues(obj1[key], obj2[key]),
      };
  });
  return commonKeys;
};

const calculateObject = (object, func) => {
  if (!isValidObject(object)) throw "First input parameter should be an object";
  if (typeof func !== "function")
    throw "Second input parameter should be a function";
  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== "number")
      throw `Value of key ${key} in the object provided is not a number`;
    const funcResult = func(object[key]);
    if (typeof funcResult !== "number")
      throw "Function provided in input parameter should return a value of type number";
    object[key] = Math.sqrt(funcResult).toFixed(2);
  });
  return object;
};

const first = { name: { first: "Patrick", last: "Hill" }, age: 46 };
const second = { school: "Stevens", name: { first: "Patrick", last: "Hill" } };
const third = { a: 2, b: { c: true, d: false } };
const forth = { b: { c: true, d: false }, foo: "bar" };

module.exports = {
  compareArrays,
  deepEquality,
  commonKeysValues,
  calculateObject,
};
