//Require express and express router as shown in lecture code and worked in previous labs
const express = require("express");
const path = require("path");
const { searchPeopleByName, searchPeopleByID } = require("../data/people");
const { isValidName, isValidId } = require("../helpers");

const router = express.Router();

router.route("/").get(async (req, res) => {
	res.sendFile(path.resolve("static/homepage.html"));
});

router.route("/searchpeople").post(async (req, res) => {
	try {
		const searchPersonName = isValidName(req.body.searchPersonName);
		const people = await searchPeopleByName(searchPersonName);
		if (people.length > 0)
			res.render("peopleFound", {
				title: "People Found",
				searchPersonName,
				people,
				showBackToHome: true,
			});
		else
			res.status(404).render("personNotFound", {
				title: "People Found",
				searchPersonName,
				showBackToHome: true,
			});
	} catch (error) {
		res.status(400).render("error", {
			title: "Error",
			error,
			showBackToHome: true,
		});
	}
});

router.route("/persondetails/:id").get(async (req, res) => {
	try {
		const id = isValidId(req.params.id);
		const person = await searchPeopleByID(id);
		if (person === undefined) {
			res.status(404).render("personNotFound", {
				title: "Person Found",
				searchPersonName: `Id as ${id}`,
				showBackToHome: true,
			});
		} else {
			res.render("personFoundByID", {
				title: "Person Found",
				...person,
			});
		}
	} catch (error) {
		res.status(400).render("error", {
			title: "Person Found",
			error,
		});
	}
});

module.exports = router;
