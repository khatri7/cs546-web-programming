//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const axios = require("axios");

const isNumberChar = (char) => char >= "0" && char <= "9";

const GET = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const errResp = (e, res, notFoundMsg = null) => {
  if (e.response && e.response.status && e.response.statusText) {
    res.status(e.response.status).json({
      error:
        e.response.status === 404 && notFoundMsg
          ? notFoundMsg
          : e.response.statusText,
    });
  } else res.status(500);
};

const isValidId = (idParam) => {
  const errObj = {
    response: {
      status: 400,
      statusText: "Invalid URL Parameter",
    },
  };
  if (!idParam || typeof idParam !== "string" || idParam.trim().length === 0)
    throw errObj;
  idParam
    .trim()
    .split("")
    .forEach((char) => {
      if (!isNumberChar(char)) throw errObj;
    });
  const id = parseInt(idParam);
  if (!isFinite(id) || id < 1) throw errObj;
  return idParam.trim();
};

module.exports = {
  GET,
  errResp,
  isValidId,
};
