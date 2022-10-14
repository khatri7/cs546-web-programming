//require express and express router as shown in lecture code
const express = require("express");
const { moviesData } = require("../data");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const movies = await moviesData.getAllMovies();
      res.json(movies);
    } catch (e) {}
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route("/:movieId")
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  })
  .put(async (req, res) => {
    //code here for PUT
  });

module.exports = router;
