const people = require("./people");
const companies = require("./companies");

async function main() {
  try {
    const result = await people.getPersonById(
      "fa36544d-bf92-4ed6-aa84-7085c6cb0440"
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await people.sameJobTitle("Help DESK");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await people.getPostalCodes("Salt LAKE City   ", "  Utah  ");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await people.sameCityAndState("Salt LAKE City  ", "  UtAh");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await companies.listEmployees("Kemmer-Mohr");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await companies.sameIndustry("   Auto PARTS:O.E.M.");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
  try {
    const result = await companies.getCompanyById(
      "  fb90892a-f7b9-4687-b497-d3b46faddf   "
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

main();
