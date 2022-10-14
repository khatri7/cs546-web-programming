const { movies } = require("../config/mongoCollections");

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const moviesList = await moviesCollection.find({}).toArray();
  return moviesList;
};

const getMovieById = async (id) => {};

const removeMovie = async (id) => {};

const updateMovie = async (
  id,
  title,
  plot,
  genres,
  rating,
  studio,
  castMembers,
  dateReleased,
  runtime
) => {};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  renameMovie,
};
