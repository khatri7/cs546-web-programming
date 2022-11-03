//Require express and express router as shown in lecture code and worked in previous labs
const express = require("express");
const path = require("path");
const { searchPeopleByName, searchPeopleByID } = require("../data/people");

const router = express.Router();

router.route("/").get(async (req, res) => {
	res.sendFile(path.resolve("static/homepage.html"));
});

router.route("/searchpeople").post(async (req, res) => {
	const { searchPersonName } = req.body;
	const people = await searchPeopleByName(searchPersonName);
	res.render("peopleFound", {
		title: "People Found",
		searchPersonName,
		people,
		peopleFound: !!people.length,
	});
});

router.route("/persondetails/:id").get(async (req, res) => {
	//code here for GET
	const person = await searchPeopleByID(parseInt(req.params.id));
	res.render("personFoundByID", {
		title: "Person Found",
		...person,
	});
});

module.exports = router;
