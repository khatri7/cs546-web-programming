//require express and express router as shown in lecture code
const express = require("express");
const { reviewsData } = require("../data");

const router = express.Router();

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      const reviews = await reviewsData.getAllReviews(req.params.movieId);
      res.json(reviews);
    } catch (e) {
      res.status(500);
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
      res.status(500);
    }
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    try {
      const review = await reviewsData.getReview(req.params.reviewId);
      res.json(review);
    } catch (e) {
      res.status(500).json();
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

module.exports = router;
