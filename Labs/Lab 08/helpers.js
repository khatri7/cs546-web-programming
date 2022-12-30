const isLetterChar = (char) =>
	char.toLowerCase() >= "a" && char.toLowerCase() <= "z";

const isNumberChar = (char) => char >= "0" && char <= "9";

isValidName = (name) => {
	if (!name) throw "Please provide a valid name";
	if (typeof name !== "string") throw "Name should be of type string";
	name = name.trim();
	if (name.length === 0)
		throw "Enter valid name. Empty name or name with spaces is not a valid name";
	name.split("").forEach((char) => {
		if (!isLetterChar(char) && char !== " ") throw "Please enter a valid name";
	});
	return name;
};

isValidId = (id) => {
	if (!id || typeof id !== "string") throw "Please provide a valid id";
	id = id.trim();
	id.split("").forEach((char) => {
		if (!isNumberChar(char)) throw "Please enter a valid Id";
	});
	if (parseInt(id) < 0) throw "Please enter a valid id";
	return id;
};

module.exports = {
	isValidName,
	isValidId,
};
