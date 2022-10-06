const axios = require("axios");
const { getPeople, validStringInput, GET } = require("./people");

const companiesDataUrl =
  "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json";

const getCompanies = async () => GET(companiesDataUrl);

const listEmployees = async (companyName) => {
  validStringInput(companyName, "Company name");
  const companies = await getCompanies();
  const people = await getPeople();
  const company = companies?.filter(
    (company) =>
      company?.name?.toLowerCase().trim() === companyName.toLowerCase().trim()
  )[0];
  if (!company) throw "Could not find a company for the provided company name";
  let employees = people
    ?.filter((person) => person?.company_id?.trim() === company.id?.trim())
    .sort((a, b) =>
      a.last_name?.toLowerCase() >= b.last_name?.toLowerCase() ? 1 : -1
    )
    .map((person) => `${person.first_name} ${person.last_name}`);
  return {
    ...company,
    employees,
  };
};

const sameIndustry = async (industry) => {
  validStringInput(industry, "Industry");
  const companies = await getCompanies();
  const companiesInSameIndustry = companies?.filter(
    (company) =>
      company?.industry?.toLowerCase().trim() === industry.toLowerCase().trim()
  );
  if (!companiesInSameIndustry?.length)
    throw "Cannot find any companies belonging to the industry provided";
  return companiesInSameIndustry;
};

const getCompanyById = async (id) => {
  validStringInput(id, "Id");
  const companies = await getCompanies();
  const company = companies?.filter(
    (company) => company?.id.trim() === id.trim()
  )[0];
  if (!company) throw "Could not find any company with the id provided";
  return company;
};

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById,
};
