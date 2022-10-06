const axios = require("axios");

const peopleDataUrl =
  "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json";

const validStringInput = (str, varName) => {
  if (!str) throw `You need to provide a ${varName}`;
  if (typeof str !== "string") throw `${varName} should be of type string`;
  if (str.trim().length === 0)
    throw `Empty string/string with spaces is not a valid ${varName}`;
};

const GET = async (url) => {
  const { data } = await axios.get(url).catch((e) => {
    throw `Error making get request${
      e.response?.status &&
      e.response?.statusText &&
      `: [${e.response.status}] ${e.response.statusText}`
    }`;
  });
  return data;
};

const getPeople = async () => GET(peopleDataUrl);

const getPersonById = async (id) => {
  validStringInput(id, "Id");
  const data = await getPeople();
  const person = data?.filter((person) => person?.id?.trim() === id.trim())[0];
  if (!person) throw "404: person not found";
  return person;
};

const sameJobTitle = async (jobTitle) => {
  validStringInput(jobTitle, "Job title");
  const data = await getPeople();
  const people = data?.filter(
    (person) =>
      person?.job_title?.toLowerCase().trim() === jobTitle.toLowerCase().trim()
  );
  if (!people || people.length < 2)
    throw "Could not find 2 people with the same job title as the one provided";
  return people;
};

const getPostalCodes = async (city, state) => {
  validStringInput(city, "City");
  validStringInput(state, "State");
  const data = await getPeople();
  const postalCodes = data
    ?.filter(
      (person) =>
        person?.city?.toLowerCase().trim() === city.toLowerCase().trim() &&
        person?.state?.toLowerCase().trim() === state.toLowerCase().trim()
    )
    .map((person) => parseInt(person?.postal_code))
    .sort((a, b) => a - b);
  if (!postalCodes?.length)
    throw "Could not find any postal codes for the city and state provided";
  return postalCodes;
};

const sameCityAndState = async (city, state) => {
  validStringInput(city, "City");
  validStringInput(state, "State");
  const data = await getPeople();
  const people = data?.filter(
    (person) =>
      person?.city?.toLowerCase().trim() === city.toLowerCase().trim() &&
      person?.state?.toLowerCase().trim() === state.toLowerCase().trim()
  );
  if (!people || people.length < 2)
    throw "Could not find 2 people for the city and state provided";
  return people
    .sort((a, b) =>
      a.last_name.toLowerCase() >= b.last_name.toLowerCase() ? 1 : -1
    )
    .map((person) => `${person.first_name} ${person.last_name}`);
};

module.exports = {
  GET,
  validStringInput,
  getPeople,
  getPersonById,
  sameJobTitle,
  getPostalCodes,
  sameCityAndState,
};
