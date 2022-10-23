//require express and express router as shown in lecture code
const express = require("express");
const { reviewsData } = require("../data");
const { sendErrResp } = require("../helpers");

const router = express.Router();

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      const reviews = await reviewsData.getAllReviews(req.params.movieId);
      res.json(reviews);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .post(async (req, res) => {
    try {
      const { reviewTitle, reviewerName, review, rating } = req.body;
      const movie = await reviewsData.createReview(
        req.params.movieId,
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
      const review = await reviewsData.getReview(req.params.reviewId);
      res.json(review);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .delete(async (req, res) => {
    try {
      const movie = await reviewsData.removeReview(req.params.reviewId);
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  });

module.exports = router;
