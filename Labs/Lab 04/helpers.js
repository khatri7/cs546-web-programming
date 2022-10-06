//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

// list of valid ratings
const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];

/**
 *
 * @param {string} str
 * @param {string} varName
 * @param {("min" | "max" | "equal")} compareOp
 * @param {number} compareVal
 * @returns str after trimming if it is a valid string input
 */
const isValidStr = (str, varName, compareOp, compareVal) => {
  if (!str) throw `You need to provide a ${varName}`;
  if (typeof str !== "string") throw `${varName} should be of type string`;
  str = str.trim();
  if (str.length === 0)
    throw `Empty string/string with spaces is not a valid ${varName}`;
  if (compareOp && compareVal) {
    switch (compareOp) {
      case "min":
        if (str.length < compareVal)
          throw `${varName} should be at least ${compareVal} in length`;
        break;
      case "max":
        if (str.length > compareVal)
          throw `${varName} should be at max ${compareVal} in length`;
        break;
      case "equal":
        if (str.length !== compareVal)
          throw `${varName} should be ${compareVal} in length`;
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
    throw `${arrName} should be of type array`;
  if (compareOp && compareVal) {
    switch (compareOp) {
      case "min":
        if (arr.length < compareVal)
          throw `${arrName} length should be at least ${compareVal}`;
        break;
      case "max":
        if (arr.length > compareVal)
          throw `${arrName} length cannot be more ${compareVal}`;
        break;
      case "equal":
        if (arr.length !== compareVal)
          throw `${arrName} length should be ${compareVal}`;
        break;
      default:
        break;
    }
  }
};

const isValidObj = (obj) =>
  obj !== null && typeof obj === "object" && !Array.isArray(obj);

/**
 *
 * @param {string} title
 * @returns title after trimming if it is a valid title otherwise throws an error
 */
const isValidMovieTitle = (title) => {
  title = isValidStr(title, "title", "min", 2);
  title
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (char < "a" && char > "z" && char < "0" && char > "9" && char !== " ")
        throw "The title provided is invalid";
    });
  return title;
};

/**
 *
 * @param {string} rating
 * @returns rating after trimming if it is a valid rating otherwise throws an error
 */
const isValidRating = (rating) => {
  rating = isValidStr(rating, "rating");
  if (!validRatings.includes(rating))
    throw 'Rating should be one of the following: "G", "PG", "PG-13", "R", "NC-17"';
  return rating;
};

/**
 *
 * @param {string} studio
 * @returns studio after trimming if it is a valid studio otherwise throws an error
 */
const isValidStudio = (studio) => {
  studio = isValidStr(studio, "studio", "min", 5);
  studio
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (char < "a" && char > "z" && ![" ", "'", "."].includes(char))
        throw "The title should not consist of any special characters";
    });
  return studio;
};

/**
 *
 * @param {string} name
 * @returns name after trimming if it is a valid director name otherwise throws an error
 */
const isValidName = (name, varName) => {
  name = isValidStr(name, varName);
  const split = ([firstName, lastName, ...rest] = name.split(" "));
  if (split.length > 2) throw `Invalid ${varName} name`;
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
      if (char < "a" && char > "z" && ![" ", "'", "."].includes(char))
        throw `The ${varName} name should not consist of any special characters`;
    });
  return cleanName;
};

/**
 *
 * @param {string} name
 * @returns director name after trimming if it is a valid director name otherwise throws an error
 */
const isValidDirector = (name) => isValidName(name, "Director");

/**
 *
 * @param {string[]} genres
 * @returns genres after trimming each genre if all elements are valid genre
 */
const isValidGenres = (genres) => {
  isValidArray(genres, "Genres", "min", 1);
  genres.map((genre, index) => {
    genre = isValidStr(genre, `Genre at index ${index}`, "min", 5);
    genre
      .toLowerCase()
      .split()
      .forEach((char) => {
        if (char < "a" && char > "z" && char !== " ")
          throw `Genre at index ${index} is not a valid genre`;
      });
    return genre;
  });
  return genres;
};

const isValidCastMembers = (castMembers) => {
  isValidArray(castMembers, "Cast Members", "min", 1);
  castMembers.map((member, index) =>
    isValidName(member, `Cast at index ${index}`)
  );
  return castMembers;
};

const isValidReleaseDate = (date) => {
  date = isValidStr(date, "Release Date");
  let [month, day, year] = date.split("/");
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
    throw "Invalid release date";
  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year.toString()}`;
};

const isValidRuntime = (runtime) => {
  runtime = isValidStr(runtime, "runtime");
  const split = ([hString, mString, ...rest] = runtime
    .split(" ")
    .filter((ele) => ele !== ""));
  if (split.length > 2 || !hString.endsWith("h") || !mString.endsWith("min"))
    throw "Invalid runtime";
  const hSplit = ([hours, ...rest] = hString.split("h"));
  const mSplit = ([mins, ...rest] = mString.split("min"));
  hours = parseFloat(hours, 10);
  mins = parseFloat(mins, 10);
  if (
    !isFinite(hours) ||
    !isFinite(mins) ||
    hours < 1 ||
    mins < 1 ||
    mins > 59 ||
    hours % 1 !== 0 ||
    mins % 1 !== 0
  )
    throw "Invalid runtime";
  return `${hours}h ${mins}min`;
};

/**
 *
 * @param {object} obj
 * @returns movie object after trimming wherever needed otherwise throws an error if any of the properties is missing of invalid
 */
const isValidMovieObject = (obj) => {
  if (!isValidObj) throw "Movie object provided is not a valid object";
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
  } = obj;
  title = isValidMovieTitle(title);
  plot = isValidStr(plot, "plot");
  genres = isValidGenres(genres);
  rating = isValidRating(rating);
  studio = isValidStudio(studio);
  director = isValidDirector(director);
  castMembers = isValidCastMembers(castMembers);
  dateReleased = isValidReleaseDate(dateReleased);
  runtime = isValidRuntime(runtime);
  const objKeys = Object.keys(obj);
  if (objKeys.length > 9)
    throw "Object has extra keys. It does not follow the movie schema";
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
  };
};

console.log(isValidRuntime("2h  30mins"));

module.exports = {
  isValidMovieObject,
};
