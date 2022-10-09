//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const axios = require("axios");

const GET = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

module.exports = {
  GET,
};
