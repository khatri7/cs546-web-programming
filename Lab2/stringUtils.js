/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

/**
 *
 * @param {string} str
 * @returns {boolean} if a word is palindrome or not
 */
const isWordPalindrome = (str) =>
  str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

/**
 *
 * @param {string} word
 * @returns {string} the word after trimming all special (non alpha numeric) characters from the beginning and end of the word
 */
const cleanWord = (word) => {
  let cleanedWord = word.split("");
  const check = (char) =>
    (char >= "A" && char <= "Z") ||
    (char >= "a" && char <= "z") ||
    (char >= "0" && char <= "9");
  for (let i = 0; i < cleanedWord.length; i++) {
    if (check(cleanedWord[i])) break;
    cleanedWord[i] = "";
  }
  for (i = cleanedWord.length - 1; i >= 0; i--) {
    if (check(cleanedWord[i])) break;
    cleanedWord[i] = "";
  }
  return cleanedWord.join("").trim();
};

const palindromes = (string) => {
  if (string === undefined) throw "No parameter provided";
  if (typeof string !== "string") throw "Parameter should be of type string";
  if (string.length === 0 || string.trim().length === 0)
    throw "Empty strings/strings with just spaces are not valid";
  const palindromeWords = [];
  string.split(" ").forEach((word) => {
    const cleanedWord = cleanWord(word);
    if (isWordPalindrome(cleanedWord)) palindromeWords.push(cleanedWord);
  });
  return palindromeWords;
};

const replaceChar = (string) => {
  if (string === undefined) throw "No parameter provided";
  if (typeof string !== "string") throw "Parameter should be of type string";
  if (string.length === 0 || string.trim().length === 0)
    throw "Empty strings/strings with just spaces are not valid";
  const charArr = string.split("");
  let flip = true;
  for (let i = 1; i < charArr.length; i += 2) {
    charArr[i] = flip ? "*" : "$";
    flip = !flip;
  }
  return charArr.join("");
};

const charSwap = (string1, string2) => {
  if (string1 === undefined || string2 === undefined)
    throw "One or both parameters missing";
  if (typeof string1 !== "string" || typeof string2 !== "string")
    throw "Parameters should be of type string";
  if (string1.length < 4 || string2.length < 4)
    throw "Strings should be at least 4 characters";
  if (!string1.trim().length || !string2.trim().length)
    throw "Empty strings/strings with just spaces are not valid";
  return `${string2.slice(0, 4)}${string1.slice(4)} ${string1.slice(
    0,
    4
  )}${string2.slice(4)}`;
};

console.log(palindromes("Wow! Did you 212 see that racecar go?"));

module.exports = {
  palindromes,
  replaceChar,
  charSwap,
};
