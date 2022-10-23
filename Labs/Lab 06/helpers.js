const { ObjectId } = require("mongodb");

// list of valid ratings
const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];

// error codes and messages
const error = {
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
  },
  BAD_REQUEST: {
    status: 400,
    message: "Invalid Request Parameter",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
};

Object.freeze(error);

const createErrorObj = (err, message) => {
  if (!err || !err.status || !err.message) return error.INTERNAL_SERVER_ERROR;
  return {
    ...err,
    message: message ? message : err.message,
  };
};

const badRequestErr = (message) => createErrorObj(error.BAD_REQUEST, message);
const notFoundErr = (message) => createErrorObj(error.NOT_FOUND, message);
const internalServerErr = (message) =>
  createErrorObj(error.INTERNAL_SERVER_ERROR, message);

const sendErrResp = (res, { status, message }) =>
  res
    .status(status || error.INTERNAL_SERVER_ERROR)
    .json(message ? { message } : "");

/**
 *
 * @param {string} char
 * @returns {boolean} if the character provided is a lower case letter
 */
const isLetterChar = (char) => char >= "a" && char <= "z";

/**
 *
 * @param {string} char
 * @returns {boolean} if the character provided is a number
 */
const isNumberChar = (char) => char >= "0" && char <= "9";

/**
 *
 * @param {string} str
 * @param {string} varName
 * @param {("min" | "max" | "equal")} compareOp
 * @param {number} compareVal
 * @returns str after trimming if it is a valid string input
 */
const isValidStr = (str, varName, compareOp, compareVal) => {
  if (!str) throw badRequestErr(`You need to provide a ${varName}`);
  if (typeof str !== "string")
    throw badRequestErr(`${varName} should be of type string`);
  str = str.trim();
  if (str.length === 0)
    throw badRequestErr(
      `Empty string/string with spaces is not a valid ${varName}`
    );
  if (compareOp && compareVal) {
    switch (compareOp) {
      case "min":
        if (str.length < compareVal)
          throw badRequestErr(
            `${varName} should be at least ${compareVal} in length`
          );
        break;
      case "max":
        if (str.length > compareVal)
          throw badRequestErr(
            `${varName} should be at max ${compareVal} in length`
          );
        break;
      case "equal":
        if (str.length !== compareVal)
          throw badRequestErr(`${varName} should be ${compareVal} in length`);
        break;
      default:
        break;
    }
  }
  return str;
};

/**
 *
 * @param {Array} arr
 * @param {string} arrName
 * @param {("min" | "max" | "equal")} compareOp
 * @param {number} compareVal
 */
const isValidArray = (arr, arrName, compareOp, compareVal) => {
  if (typeof arr !== "object" || !Array.isArray(arr))
    throw badRequestErr(`${arrName} should be of type array`);
  if (compareOp && compareVal) {
    switch (compareOp) {
      case "min":
        if (arr.length < compareVal)
          throw badRequestErr(
            `${arrName} length should be at least ${compareVal}`
          );
        break;
      case "max":
        if (arr.length > compareVal)
          throw badRequestErr(`${arrName} length cannot be more ${compareVal}`);
        break;
      case "equal":
        if (arr.length !== compareVal)
          throw badRequestErr(`${arrName} length should be ${compareVal}`);
        break;
      default:
        break;
    }
  }
};

/**
 *
 * @param {object} obj
 * @returns {boolean} if the object provided is a valid object
 */
const isValidObj = (obj) =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

/**
 *
 * @param {string} title
 * @returns {string} title after trimming if it is a valid title otherwise throws an error
 */
const isValidMovieTitle = (title) => {
  title = isValidStr(title, "Title", "min", 2);
  title
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (!isLetterChar(char) && !isNumberChar(char) && char !== " ") {
        throw badRequestErr("Provided title is not valid");
      }
    });
  return title;
};

/**
 *
 * @param {string} rating
 * @returns {string} rating after trimming if it is a valid rating otherwise throws an error
 */
const isValidRating = (rating) => {
  rating = isValidStr(rating, "rating");
  if (!validRatings.includes(rating))
    throw badRequestErr(
      'Rating should be one of the following: "G", "PG", "PG-13", "R", "NC-17"'
    );
  return rating;
};

/**
 *
 * @param {string} studio
 * @returns {string} studio after trimming if it is a valid studio otherwise throws an error
 */
const isValidStudio = (studio) => {
  studio = isValidStr(studio, "Studio", "min", 5);
  studio
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (!isLetterChar(char) && ![" ", ".", "'", "-"].includes(char))
        throw badRequestErr(
          "The studio name should not consist of numbers or special characters"
        );
    });
  return studio;
};

/**
 *
 * @param {string} name
 * @param {string} varName
 * @param {boolean} allowPunctuations
 * @returns {string} name after trimming if it is a valid director name otherwise throws an error
 */
const isValidName = (name, varName, allowPunctuations = false) => {
  name = isValidStr(name, varName);
  const split = ([firstName, lastName, ...rest] = name.split(" "));
  if (split.length > 2) throw badRequestErr(`Invalid ${varName} name`);
  const cleanName = `${isValidStr(
    firstName,
    `${varName} First Name`,
    "min",
    3
  )} ${isValidStr(lastName, `${varName} Last Name`, "min", 3)}`;
  cleanName
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (
        !isLetterChar(char) &&
        char !== " " &&
        !(allowPunctuations && ["'", ".", "-"].includes(char))
      )
        throw badRequestErr(
          `The ${varName} name should not consist of numbers or any special characters`
        );
    });
  return cleanName;
};

/**
 *
 * @param {string} name
 * @returns {string} director name after trimming if it is a valid director name otherwise throws an error
 */
const isValidDirector = (name) => isValidName(name, "Director");

/**
 *
 * @param {string[]} genres
 * @returns {string[]} genres after trimming each genre if all elements are valid genre
 */
const isValidGenres = (genres) => {
  isValidArray(genres, "Genres", "min", 1);
  genres = genres.map((genre, index) => {
    genre = isValidStr(genre, `Genre at index ${index}`, "min", 5);
    genre
      .toLowerCase()
      .split("")
      .forEach((char) => {
        if (!isLetterChar(char) && char !== " ")
          throw badRequestErr(`Genre at index ${index} is not a valid genre`);
      });
    return genre;
  });
  return genres;
};

/**
 *
 * @param {string[]} castMembers
 * @returns {string[]} cast members after validating each element
 */
const isValidCastMembers = (castMembers) => {
  isValidArray(castMembers, "Cast Members", "min", 1);
  castMembers = castMembers.map((member, index) =>
    isValidName(member, `Cast at index ${index}`, true)
  );
  return castMembers;
};

/**
 *
 * @param {string} date in format mm/dd/yyyy
 * @returns {string} date string if it is valid otherwise throws an error
 */
const isValidReleaseDate = (date) => {
  date = isValidStr(date, "Release Date");
  for (char of date)
    if (!isNumberChar(char) && char !== "/")
      throw badRequestErr("Invalid release date");
  let [month, day, year] = date.split("/");
  if (month.length !== 2 || day.length !== 2 || year.length !== 4)
    throw badRequestErr("Invalid release date");
  year = parseInt(year.trim(), 10);
  month = parseInt(month.trim(), 10);
  day = parseInt(day.trim(), 10);
  const currentYear = new Date().getFullYear();
  if (
    !isFinite(year) ||
    !isFinite(month) ||
    !isFinite(day) ||
    year < 1900 ||
    year > currentYear + 2 ||
    month > 12 ||
    month < 1 ||
    ([1, 3, 5, 7, 8, 10, 12].includes(month) && day > 31) ||
    (month === 2 && day > 28) ||
    ([4, 6, 9, 11].includes(month) && day > 30)
  )
    throw badRequestErr("Invalid release date");
  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year.toString()}`;
};

/**
 *
 * @param {string} runtime
 * @returns {string} runtime if it is valid otherwise throws an error
 */
const isValidRuntime = (runtime) => {
  runtime = isValidStr(runtime, "runtime");
  const split = ([hString, mString, ...rest] = runtime.split(" "));
  if (split.length > 2 || !hString.endsWith("h") || !mString.endsWith("min"))
    throw badRequestErr("Invalid runtime");
  const hSplit = ([hours, ...rest] = hString.split("h"));
  const mSplit = ([mins, ...rest] = mString.split("min"));
  if (hSplit.length > 2 || mSplit > 2 || hSplit[1] !== "" || mSplit[1] !== "")
    throw badRequestErr("Invalid runtime");
  for (let char of hours)
    if (!isNumberChar(char)) throw badRequestErr("Invalid runtime");
  for (let char of mins)
    if (!isNumberChar(char)) throw badRequestErr("Invalid runtime");
  hours = parseFloat(hours, 10);
  mins = parseFloat(mins, 10);
  if (
    !isFinite(hours) ||
    !isFinite(mins) ||
    hours < 1 ||
    mins < 0 ||
    mins > 59 ||
    hours % 1 !== 0 ||
    mins % 1 !== 0
  )
    throw badRequestErr("Invalid runtime");
  return `${hours}h ${mins}min`;
};

/**
 *
 * @param {object} obj
 * @returns {object} movie object after trimming wherever needed otherwise throws an error if any of the properties is missing of invalid
 */
const isValidMovieObject = (obj) => {
  if (!isValidObj)
    throw badRequestErr("Object provided is not a valid movie object");
  let {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
    reviews,
    overallRating,
  } = obj;
  title = isValidMovieTitle(title);
  plot = isValidStr(plot, "Plot");
  genres = isValidGenres(genres);
  rating = isValidRating(rating);
  studio = isValidStudio(studio);
  director = isValidDirector(director);
  castMembers = isValidCastMembers(castMembers);
  dateReleased = isValidReleaseDate(dateReleased);
  runtime = isValidRuntime(runtime);
  return {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
    reviews: reviews ? reviews : [],
    overallRating: overallRating ? overallRating : 0,
  };
};

/**
 *
 * @param {string} id
 * @returns {ObjectId} the object id if it is valid otherwise throws an error
 */
const isValidObjectId = (id) => {
  id = isValidStr(id, "Id");
  if (!ObjectId.isValid(id)) throw badRequestErr("Invalid Object Id");
  return ObjectId(id);
};

/**
 *
 * @returns {string} current date in the format MM/DD/YYYY
 */
const getCurrentDate = () => {
  const today = new Date();
  return `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today
    .getDate()
    .toString()
    .padStart(2, "0")}/${today.getFullYear()}`;
};

/**
 *
 * @param {number} rating
 * @returns {number} rating rounded to one decimal place if it is a valid rating else throws an error
 */
const isValidReviewRating = (rating) => {
  if (typeof rating !== "number" || !isFinite(rating))
    throw badRequestErr("Review rating should be of type number");
  if (rating < 1 || rating > 5)
    throw badRequestErr("Review rating should be between 1 to 5");
  if ((rating * 10) % 1 > 0)
    throw badRequestErr("Review rating should have only one decimal place");
  return parseFloat(rating.toFixed(1));
};

/**
 *
 * @param {Array} reviews
 * @returns {number} over all rating (avg rating) of all the reviews passed rounded to one decimal place
 */
const calcOverallRating = (reviews) => {
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const avg = sum / reviews.length;
  return parseFloat(avg.toFixed(1));
};

/**
 *
 * @param {object} obj
 * @returns {object} review object after trimming wherever needed otherwise throws an error if any of the properties is missing of invalid
 */
const isValidReviewObject = (obj) => {
  const { reviewTitle, reviewDate, reviewerName, review, rating } = obj;
  return {
    _id: ObjectId(),
    reviewTitle: isValidStr(reviewTitle, "review title"),
    reviewDate: reviewDate ? reviewDate : getCurrentDate(),
    reviewerName: isValidName(reviewerName, "reviewer name", true),
    review: isValidStr(review, "review"),
    rating: isValidReviewRating(rating),
  };
};

module.exports = {
  isValidMovieObject,
  isValidObjectId,
  isValidReviewObject,
  calcOverallRating,
  badRequestErr,
  notFoundErr,
  internalServerErr,
  sendErrResp,
};
