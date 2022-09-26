/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const { arrayStats, makeObjects, commonElements } = require("./arrayUtils");
const { palindromes, replaceChar, charSwap } = require("./stringUtils");
const {
  deepEquality,
  commonKeysValues,
  calculateObject,
} = require("./objectUtils");

/* Array Util Tests */

//arrayStats
try {
  const stats = arrayStats([9, 15, 25.5, -5, 5, 7, 10, 5, 11, 30, 4, 1, -20]);
  console.log("Stats calculated successfully");
} catch (e) {
  console.error("Stats calculations failed testcase");
}

try {
  const stats = arrayStats("banana");
  console.error("Stats calculations did not error");
} catch (e) {
  console.log("Stats calculations failed successfully");
}

//makeObjects
try {
  const obj = makeObjects(
    ["foo", "bar"],
    ["name", "Patrick Hill"],
    ["foo", "not bar"]
  );
  console.log("Making object successfull");
} catch (e) {
  console.error("Making object failed testcase");
}

try {
  const obj = makeObjects(["guitar", 1, 3, "apple"]);
  console.error("Making object did not error");
} catch (e) {
  console.log("Making object failed successfully");
}

//commonElements
try {
  const common = commonElements([5, 7], [20, 5]);
  console.log("Common elements found successfully");
} catch (e) {
  console.error("Common elements failed testcase");
}

try {
  const common = commonElements({});
  console.error("Common elements did not error");
} catch (e) {
  console.log("Common elements failed successfully");
}

/* String Util Tests */

//palindromes
try {
  const palindromesArr = palindromes(
    "Hi mom, At noon, I'm going to take my kayak to the lake"
  );
  console.log("Palindromes found successfully");
} catch (e) {
  console.error("Palindromes failed testcase");
}

try {
  const palindromesArr = palindromes([
    "Hi mom, At noon, I'm going to take my kayak to the lake",
  ]);
  console.error("Palindromes did not error");
} catch (e) {
  console.log("Palindromes failed successfully");
}

//replaceChar
try {
  const replaced = replaceChar("Hello, How are you? I hope you are well");
  console.log("Replaced successfully");
} catch (e) {
  console.error("Character replace failed testcase");
}

try {
  const replaced = replaceChar("     ");
  console.error("Character replace did not error");
} catch (e) {
  console.log("Character replace failed successfully");
}

//charSwap
try {
  const swap = charSwap("Patrick", "Hill");
  console.log("Swapped successfully");
} catch (e) {
  console.error("Swapped failed testcase");
}

try {
  const swap = charSwap("h", "e");
  console.error("Character swap did not error");
} catch (e) {
  console.log("Character swap failed successfully");
}

/* Array Util Tests */

//deepEquality
try {
  const isEqual = deepEquality(
    {
      a: { sA: "Hello", sB: "There", sC: "Class" },
      b: 7,
      c: true,
      d: "Test",
    },
    { c: true, b: 7, d: "Test", a: { sB: "There", sC: "Class", sA: "Hello" } }
  );
  console.log("Deep equality ran successfully");
} catch (e) {
  console.error("Deep equality failed testcase");
}

try {
  const isEqual = deepEquality([], {});
  console.error("Deep equality did not error");
} catch (e) {
  console.log("Deep equality failed successfully");
}

//commonKeysValues
try {
  const common = commonKeysValues(
    { name: { first: "Patrick", last: "Hill" }, age: 46 },
    { school: "Stevens", name: { first: "Patrick", last: "Hill" } }
  );
  console.log("Common keys found successfully");
} catch (e) {
  console.error("Common keys failed testcase");
}

try {
  const common = commonKeysValues("foo", {
    school: "Stevens",
    name: { first: "Patrick", last: "Hill" },
  });
  console.error("Common keys did not error");
} catch (e) {
  console.log("Common keys failed successfully");
}

//calculateObject
try {
  const calc = calculateObject({ a: 3, b: 7, c: 5 }, (n) => n * 2);
  console.log("Calculate object ran successfully");
} catch (e) {
  console.error("Calculate object failed testcase");
}

try {
  const calc = calculateObject([], (n) => n * 2);
  console.error("Calculate object did not error");
} catch (e) {
  console.log("Calculate object failed successfully");
}
