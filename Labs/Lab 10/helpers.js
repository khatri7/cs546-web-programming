const bcrypt = require("bcrypt");

const BCRYPT_SALT_ROUNDS = 16;

// error codes and messages
const error = {
	NOT_FOUND: {
		status: 404,
		message: "Not Found",
	},
	BAD_REQUEST: {
		status: 400,
		message: "Invalid Request Parameter",
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		message: "Internal Server Error",
	},
};

Object.freeze(error);

const createErrorObj = (err, message) => {
	if (!err || !err.status || !err.message) return error.INTERNAL_SERVER_ERROR;
	return {
		...err,
		message: message ? message : err.message,
	};
};

const badRequestErr = (message) => createErrorObj(error.BAD_REQUEST, message);
const notFoundErr = (message) => createErrorObj(error.NOT_FOUND, message);
const internalServerErr = (message) =>
	createErrorObj(error.INTERNAL_SERVER_ERROR, message);

const sendErrResp = (res, { status, message }) =>
	res
		.status(status || error.INTERNAL_SERVER_ERROR)
		.json(message ? { message } : "");

/**
 *
 * @param {string} char
 * @returns {boolean} if the character provided is a lower case letter
 */
const isLetterChar = (char) =>
	char.toLowerCase() >= "a" && char.toLowerCase() <= "z";

/**
 *
 * @param {string} char
 * @returns {boolean} if the character provided is a number
 */
const isNumberChar = (char) => char >= "0" && char <= "9";

/**
 *
 * @param {string} str
 * @param {string} varName
 * @param {("min" | "max" | "equal")} compareOp
 * @param {number} compareVal
 * @returns str after trimming if it is a valid string input
 */
const isValidStr = (str, varName, compareOp, compareVal) => {
	if (!str) throw badRequestErr(`You need to provide a ${varName}`);
	if (typeof str !== "string")
		throw badRequestErr(`${varName} should be of type string`);
	str = str.trim();
	if (str.length === 0)
		throw badRequestErr(
			`Empty string/string with spaces is not a valid ${varName}`
		);
	if (compareOp && compareVal) {
		switch (compareOp) {
			case "min":
				if (str.length < compareVal)
					throw badRequestErr(
						`${varName} should be at least ${compareVal} in length`
					);
				break;
			case "max":
				if (str.length > compareVal)
					throw badRequestErr(
						`${varName} should be at max ${compareVal} in length`
					);
				break;
			case "equal":
				if (str.length !== compareVal)
					throw badRequestErr(`${varName} should be ${compareVal} in length`);
				break;
			default:
				break;
		}
	}
	return str;
};

const isValidUserName = (username) => {
	username = isValidStr(username, "Username", "min", 4);
	username.split("").forEach((char) => {
		if (!isLetterChar(char) && !isNumberChar(char))
			throw badRequestErr(
				"Username should only consist of alphanumeric characters"
			);
	});
	return username.toLowerCase();
};

/**
 *
 * @param {string} password
 * @returns {string} hash of the password
 */
const hashPassword = async (password) => {
	try {
		const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
		return hash;
	} catch (e) {
		throw internalServerErr("Error hashing password. Please try again");
	}
};

/**
 *
 * @param {string} password plain text password to compare
 * @param {string} hash hash of the password from DB
 * @returns {boolean} result of the comparision or throws an error
 */
const comparePassword = async (password, hash) => {
	try {
		const isSame = await bcrypt.compare(password, hash);
		return isSame;
	} catch (e) {
		throw internalServerErr("Error checking password. Please try again");
	}
};
const isValidPassword = (password) => {
	if (typeof password === "string" && password.includes(" "))
		throw badRequestErr("Password cannot contain spaces");
	password = isValidStr(password, "Password", "min", 6);
	const uppercaseLetterArr = [];
	const lowercaseLetterArr = [];
	const numberArr = [];
	const specialCharArr = [];
	password.split("").forEach((char) => {
		if (isNumberChar(char)) numberArr.push(char);
		else if (char >= "A" && char <= "Z") uppercaseLetterArr.push(char);
		else if (isLetterChar(char)) lowercaseLetterArr.push(char);
		else specialCharArr.push(char);
	});
	if (
		uppercaseLetterArr.length === 0 ||
		numberArr.length === 0 ||
		specialCharArr.length === 0
	)
		throw badRequestErr(
			"Password must contain at least one uppercase letter, one number, and one special character"
		);
	return password;
};

const isValidUserObj = (userObj) => ({
	username: isValidUserName(userObj.username),
	password: isValidPassword(userObj.password),
});

module.exports = {
	isValidUserName,
	isValidUserObj,
	hashPassword,
	comparePassword,
	notFoundErr,
	internalServerErr,
	badRequestErr,
};
