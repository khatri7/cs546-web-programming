const { movies, mycollection } = require("../config/mongoCollections");

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
) => {
  // const moviesCollection = await mycollection();
  // const res = await moviesCollection.insertOne({ name: "Test" });
  // console.log(res);
};

const getAllMovies = async () => {
  const moviesCollection = await mycollection();
  const dogList = await moviesCollection.find({}).toArray();
  return dogList.map((item) => ({
    ...item,
    newid: item._id.toString(),
  }));
};

const getMovieById = async (id) => {};

const removeMovie = async (id) => {};

const renameMovie = async (id, newName) => {};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
