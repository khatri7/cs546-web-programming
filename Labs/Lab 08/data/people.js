const axios = require("axios");

const peopleDataUrl =
	"https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json";

const GET = async (url) => {
	const { data } = await axios.get(url);
	return data;
};

//Axios call to get all data
const getAllPeople = async () => GET(peopleDataUrl);

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
	const people = await getAllPeople();
	return people
		.filter((person) =>
			`${person.firstName}${person.lastName}`
				.toLowerCase()
				.includes(searchPersonName.toLowerCase())
		)
		.sort((a, b) => a.id - b.id)
		.slice(0, 20);
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
	const people = await getAllPeople();
	return people.find((person) => person.id === id);
};

module.exports = { searchPeopleByName, searchPeopleByID };
