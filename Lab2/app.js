/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");

const arr1 = [5, 7];
const arr2 = [20, 5];
const arr3 = [true, 5, "Patrick"];
const arr4 = ["CS-546", "Patrick"];
const arr5 = [67.7, "Patrick", true];
const arr6 = [true, 5, "Patrick"];
const arr7 = [undefined, 5, "Patrick"];
const arr8 = [null, undefined, true];
const arr9 = ["2D case", ["foo", "bar"], "bye bye"];
const arr10 = [["foo", "bar"], true, "String", 10];

// try {
//   console.log(arrayUtils.commonElements(arr3, arr4, arr5));
// } catch (e) {
//   console.log(e);
// }

try {
  console.log(stringUtils.palindromes(["Hello World"]));
} catch (e) {
  console.log(e);
}
