const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
  return true;
};

const questionOne = (arr) => arr.map((num) => isPrime(num));

const questionTwo = (startingNumber, commonRatio, numberOfTerms) => {
  if (startingNumber === 0 || commonRatio === 0) return 0;
  if (numberOfTerms <= 0 || numberOfTerms % 1 !== 0) return NaN;
  const sumOfGP =
    ((1 - Math.pow(commonRatio, numberOfTerms)) / (1 - commonRatio)) *
    startingNumber;
  return sumOfGP;
};

const questionThree = (str) => {
  const strLowerCase = str.toLowerCase().trim();
  let numOfConsonants = strLowerCase.length;
  for (let i = 0; i < strLowerCase.length; i++)
    if (
      ["a", "e", "i", "o", "u"].includes(strLowerCase[i]) ||
      strLowerCase[i] < "a" ||
      strLowerCase[i] > "z"
    )
      numOfConsonants--;
  return numOfConsonants;
};

const questionFour = (fullString, substring) => {
  let count = 0;
  while (fullString.includes(substring)) {
    count++;
    fullString = fullString.replace(substring, "");
  }
  return count;
};

console.log(questionTwo(25, 0, 0));

module.exports = {
  firstName: "Abhishek",
  lastName: "Khatri",
  studentId: "20012198",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
