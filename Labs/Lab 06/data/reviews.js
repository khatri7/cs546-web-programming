const { movies } = require("../config/mongoCollections");
const {
  isValidReviewObject,
  isValidObjectId,
  calcOverallRating,
  notFoundErr,
  internalServerErr,
} = require("../helpers");
const { getMovieById } = require("./movies");

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  const _id = isValidObjectId(movieId);
  const movie = await getMovieById(_id.toString());
  if (!movie) throw notFoundErr("Movie not found");
  const reviewObj = isValidReviewObject({
    reviewTitle,
    reviewerName,
    review,
    rating,
  });
  const reviews = [...movie.reviews, reviewObj];
  const overallRating = calcOverallRating(reviews);
  const moviesCollection = await movies();
  const result = await moviesCollection.updateOne(
    { _id },
    { $push: { reviews: reviewObj }, $set: { overallRating } }
  );
  if (!result.acknowledged || !result.modifiedCount)
    throw internalServerErr("Error inserting review");
  const updatedMovie = await getMovieById(_id.toString());
  return updatedMovie;
};

const getAllReviews = async (movieId) => {
  const movie = await getMovieById(movieId);
  if (!movie) throw notFoundErr("Could not find a movie for the given Id");
  return movie.reviews;
};

const getReview = async (id) => {
  const _id = isValidObjectId(id);
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ "reviews._id": _id });
  if (!movie) throw notFoundErr("Review not found");
  const review = movie.reviews.find(
    (review) => review._id.toString() === _id.toString()
  );
  return review;
};

const removeReview = async (id) => {
  const _id = isValidObjectId(id);
  const moviesCollection = await movies();
  const movie = await moviesCollection.findOne({ "reviews._id": _id });
  if (!movie) throw notFoundErr("Review not found");
  const { _id: movieId, reviews, overallRating } = movie;
  let updatedOverallRating = overallRating;
  const updatedReviews = reviews.filter(
    (review) => review._id.toString() !== _id.toString()
  );
  updatedOverallRating = calcOverallRating(updatedReviews);
  const result = await moviesCollection.updateOne(
    { _id: movieId },
    {
      $pull: { reviews: { _id } },
      $set: { overallRating: updatedOverallRating },
    }
  );
  if (!result.acknowledged || !result.modifiedCount)
    throw internalServerErr("Error inserting review");
  const updatedMovie = await getMovieById(movieId.toString());
  return updatedMovie;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview,
};
