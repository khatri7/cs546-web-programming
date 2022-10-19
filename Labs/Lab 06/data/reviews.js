const { movies } = require("../config/mongoCollections");
const { isValidReviewObject, isValidObjectId } = require("../helpers");
const { getMovieById, updateMovie } = require("./movies");

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  const movie = await getMovieById(movieId);
  if (!movie) throw "movie not found";
  const reviewObj = isValidReviewObject({
    reviewTitle,
    reviewerName,
    review,
    rating,
  });
  const {
    title,
    plot,
    genres,
    rating: movieRating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
  } = movie;
  const reviews = [...movie.reviews, reviewObj];
  const overallRating =
    (movie.overallRating * movie.reviews.length + parseFloat(rating)) /
    reviews.length;
  const updatedMovie = await updateMovie(
    movieId,
    title,
    plot,
    genres,
    movieRating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
    reviews,
    overallRating
  );
  return updatedMovie;
};

const getAllReviews = async (movieId) => {
  const movie = await getMovieById(movieId);
  if (!movie || !movie.reviews) throw "error";
  return movie.reviews;
};

const getReview = async (id) => {
  const _id = isValidObjectId(id);
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ "reviews._id": _id });
  if (!movie) throw "review not found";
  const review = movie.reviews.find(
    (review) => review._id.toString() === _id.toString()
  );
  return review;
};

const removeReview = async (id) => {};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
};
