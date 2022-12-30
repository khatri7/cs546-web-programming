/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
const isValidStr = (str) => {
	if (!str) throw "Please provide an input";
	if (typeof str !== "string") throw "Please provide a valid input";
	str = str.trim();
	if (str.length === 0)
		throw "Empty string/string with spaces is not a valid input";
	return str;
};

const isNumberChar = (char) => char >= "0" && char <= "9";

// TODO - figure out if -0 is valid
const isValidElem = (ele) =>
	isFinite(Math.abs(ele)) && parseFloat(ele) === parseInt(ele);

const form = document.getElementById("arrayform");
const arrayInput = document.getElementById("arrayinput");
const errorText = document.getElementById("errortext");
const resultsList = document.getElementById("results");

const clearError = () => {
	arrayInput.classList.remove("error-input");
	errorText.innerText = "";
};

const cleanArrString = (arrString) => {
	let startIndex = arrString.indexOf("[");
	let headStr = arrString;
	if (startIndex !== -1) {
		headStr = arrString.slice(0, startIndex);
	}
	headStr.split("").forEach((char) => {
		if (!["", " ", ","].includes(char)) throw "error";
	});
	if (startIndex >= 0) {
		const arr = arrString
			.slice(startIndex + 1)
			.split(",")
			.filter((char) => char !== "" && char !== " ");
		return arr.map((elem, index) => {
			elem = elem.trim();
			if (!isValidElem(elem))
				throw `invalid element at index ${index} ("${elem}")`;
			return parseInt(elem);
		});
	}
};

const createArr = (input) => {
	let arr = [];
	const arrStrings = `${input},`.split("],");
	const tail = arrStrings.pop();
	try {
		cleanArrString(tail);
	} catch (e) {
		throw "Invalid input: Found elements at the end of the array(s) input";
	}
	arrStrings.forEach((arrString, index) => {
		let tempArr = [];
		try {
			tempArr = cleanArrString(arrString);
		} catch (e) {
			if (e === "error")
				throw `Invalid input: Found elements before array number ${index + 1}`;
			else throw `Invalid Input: array at index ${index}: ${e}`;
		}
		if (tempArr.length === 0)
			throw `Invalid input: array at index ${index}: Found an empty array`;
		arr = [...arr, ...tempArr];
	});
	return arr;
};

const isValidArraysInput = (inputParam) => {
	const input = isValidStr(inputParam)
		.split("")
		.map((char) => char.trim())
		.filter((char) => {
			if (
				!["", " ", "-", ",", "[", "]"].includes(char) &&
				!isNumberChar(char)
			) {
				console.log("failing here");
				throw "Invalid Input: Only whole number (including negative and 0) array(s) are allowed.";
			}
			return char !== " " && char !== "";
		})
		.join("");
	if (
		input.split("[").length === 1 ||
		input.split("]").length === 1 ||
		input.split("[").length !== input.split("]").length
	)
		throw "Invalid input: Expecting only whole number (including negative and 0) array(s). Found none or an incomplete array";
	const inputArr = createArr(input);
	return inputArr;
};

const onSubmit = (e) => {
	try {
		e.preventDefault();
		clearError();
		const arrayValue = e.target.array.value;
		const mergedArr = isValidArraysInput(arrayValue);
		const sortedArr = mergedArr.sort((a, b) => a - b);
		const listItems = document.querySelectorAll("#results li");
		const className = listItems.length % 2 === 0 ? "is-green" : "is-red";
		resultsList.innerHTML += `<li class=${className}>[${sortedArr}]</li>`;
	} catch (error) {
		arrayInput.classList.add("error-input");
		errorText.innerText = error;
	}
};

if (form) form.addEventListener("submit", onSubmit);
