const express = require("express");
const { checkUser, createUser } = require("../data/users");
const {
	isValidUserObj,
	internalServerErr,
	badRequestErr,
} = require("../helpers");

const router = express.Router();

router.route("/").get(async (req, res) => {
	if (req.session.user) return res.redirect("/protected");
	res.render("userLogin", {
		title: "Login",
	});
});

router
	.route("/register")
	.get(async (req, res) => {
		if (req.session.user) return res.redirect("/protected");
		res.render("userRegister", {
			title: "Register",
		});
	})
	.post(async (req, res) => {
		try {
			const registerObj = isValidUserObj({
				username: req.body.usernameInput,
				password: req.body.passwordInput,
			});
			const { userInserted } = await createUser(
				registerObj.username,
				registerObj.password
			);
			if (!userInserted)
				throw internalServerErr("Error inserting user into DB");
			res.redirect("/");
		} catch (e) {
			res.status(e.status || 500).render("userRegister", {
				title: "Register",
				error: e.message || "Internal Server Error",
			});
		}
	});

router.route("/login").post(async (req, res) => {
	try {
		const loginObj = isValidUserObj({
			username: req.body.usernameInput,
			password: req.body.passwordInput,
		});
		const { authenticatedUser } = await checkUser(
			loginObj.username,
			loginObj.password
		);
		if (!authenticatedUser)
			throw badRequestErr("Either the username or password is invalid");
		req.session.user = {
			username: loginObj.username,
		};
		res.redirect("/protected");
	} catch (e) {
		res.status(e.status || 500).render("userLogin", {
			title: "Login",
			error: e.message || "Internal Server Error",
		});
	}
});

router.route("/protected").get(async (req, res) => {
	try {
		if (!req.session.user)
			throw {
				status: 403,
				message: "Forbidden",
			};
		res.render("private", {
			title: "Welcome",
			username: req.session.user.username,
			datetime: new Date().toUTCString(),
		});
	} catch (e) {
		res.status(e.status || 403).renderrender("forbiddenAccess", {
			title: "Forbidden",
		});
	}
});

router.route("/logout").get(async (req, res) => {
	if (!req.session.user) return res.redirect("/");
	req.session.destroy();
	res.render("logout", {
		title: "Goodbye",
	});
});

module.exports = router;
