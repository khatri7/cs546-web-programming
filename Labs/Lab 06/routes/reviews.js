//require express and express router as shown in lecture code
const express = require("express");
const { reviewsData } = require("../data");
const {
  sendErrResp,
  isValidObjectId,
  isValidReviewObject,
} = require("../helpers");

const router = express.Router();

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.movieId);
      const reviews = await reviewsData.getAllReviews(_id.toString());
      res.json(reviews);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .post(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.movieId);
      const { reviewTitle, reviewerName, review, rating } = isValidReviewObject(
        req.body
      );
      const movie = await reviewsData.createReview(
        _id.toString(),
        reviewTitle,
        reviewerName,
        review,
        rating
      );
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.reviewId);
      const review = await reviewsData.getReview(_id.toString());
      res.json(review);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .delete(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.reviewId);
      const movie = await reviewsData.removeReview(_id.toString());
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  });

module.exports = router;
