const lab1 = require("./lab1");

// Question 1
console.log(lab1.questionOne([0, 3, 10]));
console.log(lab1.questionOne([2, 1, 89]));
console.log(lab1.questionOne([512, 1007, 17389]));
console.log(lab1.questionOne([0, 14159, 785]));
console.log(lab1.questionOne([11, 4, 97]));

// Question 2
console.log(lab1.questionTwo(5, 3, 10));
console.log(lab1.questionTwo(2, 0, 2));
console.log(lab1.questionTwo(512, 1007, -5));
console.log(lab1.questionTwo(5, 7, 2.3));
console.log(lab1.questionTwo(0, 10, 4));

// Question 3
console.log(lab1.questionThree("How now brown cow"));
console.log(lab1.questionThree("Welcome to CS-546"));
console.log(lab1.questionThree("JavaScript is fun!"));
console.log(
  lab1.questionThree(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  )
);
console.log(lab1.questionThree("123456!@#$%^&*()"));

// Question 4
console.log(lab1.questionFour("hello world", "o"));
console.log(lab1.questionFour("Helllllllo, class!", "ll"));
console.log(lab1.questionFour("JavaScript is the future!!", "0"));
console.log(lab1.questionFour("Librarians are here for you", "re"));
console.log(lab1.questionFour("Cristiano Ronaldo is the GOAT", "o"));
console.log(lab1.questionFour("Heeeeeeello", "eee"));
