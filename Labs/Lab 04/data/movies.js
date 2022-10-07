const { movies } = require("../config/mongoCollections");
const {
  isValidObjectId,
  isValidMovieTitle,
  isValidMovieObject,
} = require("../helpers");

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
  const moviesCollection = await movies();
  const movie = isValidMovieObject({
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
  });
  const result = await moviesCollection.insertOne(movie);
  if (!result?.acknowledged || !result?.insertedId)
    throw "Could not insert movie";
  const insertedMovie = await getMovieById(result.insertedId.toString());
  return insertedMovie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const moviesList = await moviesCollection.find({}).toArray();
  return moviesList.map((movie) => ({
    ...movie,
    _id: movie._id.toString(),
  }));
};

const getMovieById = async (id) => {
  const moviesCollection = await movies();
  _id = isValidObjectId(id);
  const movie = await moviesCollection.findOne({ _id });
  if (!movie) throw "No movie found with the provided Id";
  return {
    ...movie,
    _id: movie._id.toString(),
  };
};

const removeMovie = async (id) => {
  const moviesCollection = await movies();
  const _id = isValidObjectId(id);
  const { title } = await getMovieById(id);
  const result = await moviesCollection.deleteOne({ _id });
  if (result.deletedCount === 0) throw "Could not delete. Deleted 0 movies";
  return `${title} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
  const moviesCollection = await movies();
  const _id = isValidObjectId(id);
  const title = isValidMovieTitle(newName);
  const result = await moviesCollection.updateOne({ _id }, { $set: { title } });
  if (!result || result.matchedCount === 0)
    throw "Could not find movie with the given Id";
  if (!result || result.modifiedCount === 0)
    throw "Could not update the movie title, it is the same as before";
  const updatedMovie = await getMovieById(id);
  return updatedMovie;
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie,
};
