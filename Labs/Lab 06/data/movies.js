const { movies } = require("../config/mongoCollections");
const {
  isValidMovieObject,
  isValidObjectId,
  internalServerErr,
  notFoundErr,
  badRequestErr,
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
  const moviesCollection = await movies();
  const result = await moviesCollection.insertOne(movie);
  if (!result?.acknowledged || !result?.insertedId)
    throw internalServerErr("Could not insert movie");
  const insertedMovie = await getMovieById(result.insertedId.toString());
  return insertedMovie;
};

const getAllMovies = async () => {
  const moviesCollection = await movies();
  const moviesList = await moviesCollection.find({}).toArray();
  return moviesList.map(({ _id, title }) => ({
    _id,
    title,
  }));
};

const getMovieById = async (id) => {
  const _id = isValidObjectId(id);
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ _id });
  if (!movie) throw notFoundErr("Could not find a movie for the provided Id");
  return movie;
};

const removeMovie = async (id) => {
  const _id = isValidObjectId(id);
  const movie = await getMovieById(id);
  if (!movie) notFoundErr("Could not find a movie for the provided Id");
  const moviesCollection = await movies();
  const result = await moviesCollection.deleteOne({ _id });
  if (result.deletedCount === 0)
    throw internalServerErr("Could not delete. Deleted 0 movies");
  return {
    movieId: _id,
    deleted: true,
  };
};

const updateMovie = async (
  id,
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
  const _id = isValidObjectId(id);
  const movie = await getMovieById(_id.toString());
  if (!movie) throw notFoundErr("Could not find movie with the given Id");
  const { reviews, overallRating } = movie;
  const updatedMovieObj = isValidMovieObject({
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
  });
  const moviesCollection = await movies();
  const result = await moviesCollection.updateOne(
    { _id },
    { $set: updatedMovieObj }
  );
  if (!result || result.matchedCount === 0)
    throw notFoundErr("Could not find movie with the given Id");
  if (!result || result.modifiedCount === 0)
    throw badRequestErr(
      "Could not update the movie, as all the fields are the same as before"
    );
  const updatedMovie = await getMovieById(_id.toString());
  return updatedMovie;
};

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
