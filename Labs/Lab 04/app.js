const { closeConnection, dbConnection } = require("./config/mongoConnection");
const movies = require("./data/movies");

/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  let movie1, movie2, movie3;

  // 1
  // 2
  try {
    movie1 = await movies.createMovie(
      "Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.",
      ["Crime", "Drama", "Romance"],
      "PG-13",
      "United Artists",
      "Iain Softley",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "1h 45min"
    );
    console.log(movie1);
  } catch (e) {
    console.log(e);
  }

  // 3
  try {
    movie2 = await movies.createMovie(
      "Demo movie",
      "Demo movie plot.",
      ["Crime"],
      "PG-13",
      "United Artists",
      "Iain Softley",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "2h 30min"
    );
  } catch (e) {
    console.log(e);
  }

  // 4
  try {
    const allMovies = await movies.getAllMovies();
    console.log(allMovies);
  } catch (e) {
    console.log(e);
  }

  // 5
  // 6
  try {
    movie3 = await movies.createMovie(
      "Demo movie 2",
      "Demo movie 2 plot.",
      ["Romance"],
      "PG-13",
      "United Artists",
      "Iain Softley",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1995",
      "1h 45min"
    );
    console.log(movie3);
  } catch (e) {
    console.log(e);
  }

  // 7
  // 8
  try {
    movie1 = await movies.renameMovie(movie1._id, "Hacker Returns");
    console.log(movie1);
  } catch (e) {
    console.log(e);
  }

  // 9
  try {
    await movies.removeMovie(movie2._id);
  } catch (e) {
    console.log(e);
  }

  // 10
  try {
    const allMovies = await movies.getAllMovies();
    console.log(allMovies);
  } catch (e) {
    console.log(e);
  }

  // 11
  try {
    const hacker = await movies.createMovie(
      "Hackers",
      "Hackers are blamed for making a virus that will capsize five oil tankers.",
      ["Crime", "Drama", "Romance"],
      "PG-13",
      "United Artists",
      "Iain Softley",
      ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
      "09/15/1895",
      "1h 45min"
    );
    console.log(hacker);
  } catch (e) {
    console.log(e);
  }

  // 12
  try {
    await movies.removeMovie(movie2._id);
  } catch (e) {
    console.log(e);
  }

  // 13
  try {
    await movies.renameMovie(movie2._id, "New demo title");
  } catch (e) {
    console.log(e);
  }

  // 14
  try {
    movie3 = await movies.renameMovie(movie3._id, "This is an invalid title!!");
  } catch (e) {
    console.log(e);
  }

  // 15
  try {
    const data = await movies.getMovieById(movie2._id);
    console.log(data);
  } catch (e) {
    console.log(e);
  }

  await closeConnection();
};

main();
