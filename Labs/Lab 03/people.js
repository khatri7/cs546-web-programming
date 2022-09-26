const axios = require("axios");

const peopleDataUrl =
  "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json";

const getPeople = async () => {
  const { data } = await axios.get(peopleDataUrl);
  return data;
};

const getPersonById = async (id) => {
  if (!id) throw "You need to provide an id";
  if (typeof id !== "string") throw "Id needs to be of type string";
  if (id.trim().length === 0)
    throw "Empty string/string with spaces is not a valid Id";
  const data = await getPeople();
  const person = data.filter((person) => person.id === id)[0];
  if (!person) throw "404: person not found";
  return person;
};

const sameJobTitle = async (jobTitle) => {
  if (!jobTitle) throw "You need to provide a job title";
  if (typeof jobTitle !== "string")
    throw "Job title needs to be of type string";
  if (jobTitle.trim().length === 0)
    throw "Empty string/string with spaces is not a valid job title";
  const data = await getPeople();
  const people = data.filter(
    (person) => person.job_title.toLowerCase() === jobTitle.toLowerCase()
  );
  if (people.length < 2)
    throw "Could not find 2 people with the same job title as the one provided";
  return people;
};

const getPostalCodes = async (city, state) => {};

const sameCityAndState = async (city, state) => {};

const main = async () => {
  try {
    const resp = await sameJobTitle("asdf");
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
};

main();

module.exports = {};
