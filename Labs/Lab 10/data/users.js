const { users } = require("../config/mongoCollections");
const {
	isValidUserObj,
	isValidUserName,
	comparePassword,
	hashPassword,
	badRequestErr,
	notFoundErr,
} = require("../helpers");

const getUserByUsername = async (usernameParam) => {
	const username = isValidUserName(usernameParam);
	const usersCollection = await users();
	const user = await usersCollection.findOne({ username });
	if (!user) throw notFoundErr("No user found for the provided username");
	return user;
};

const checkUsernameAvailable = async (usernameParam) => {
	const username = isValidUserName(usernameParam);
	let user = null;
	try {
		user = await getUserByUsername(username);
	} catch (e) {
		if (e.status === 404) return true;
		else throw e;
	}
	if (user && user.username.toLowerCase() === username.toLowerCase())
		throw badRequestErr("The username provided has already been taken");
	return true;
};

const createUser = async (username, password) => {
	const userObj = isValidUserObj({
		username,
		password,
	});
	await checkUsernameAvailable(userObj.username);
	const passwordHash = await hashPassword(password);
	const usersCollection = await users();
	const result = await usersCollection.insertOne({
		...userObj,
		password: passwordHash,
	});
	if (!result?.acknowledged || !result?.insertedId)
		throw internalServerErr("Could not insert user into DB");
	return { userInserted: true };
};

const checkUser = async (username, password) => {
	const userObj = await isValidUserObj({
		username,
		password,
	});
	try {
		const user = await getUserByUsername(userObj.username);
		const doPasswordsMatch = await comparePassword(
			userObj.password,
			user.password
		);
		if (!doPasswordsMatch) throw badRequestErr("Password mismatch error");
	} catch (e) {
		if (e.status === 400 || e.status === 404)
			throw badRequestErr("Either the username or password is invalid");
		else throw e;
	}
	return {
		authenticatedUser: true,
	};
};

module.exports = { createUser, checkUser };
