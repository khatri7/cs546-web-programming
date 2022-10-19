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
    try {
      const {
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime,
      } = req.body;
      const movie = await moviesData.createMovie(
        title,
        plot,
        genres,
        rating,
        studio,
        director,
        castMembers,
        dateReleased,
        runtime
      );
      res.status(201).json(movie);
    } catch (e) {
      if (e.response && e.response.statusCode && e.response.statusCode)
        res
          .status(e.response.statusCode)
          .json({ error: e.response.statusText });
      else res.status(500);
    }
  });

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      // TODO: check if id is valid
      const movie = await moviesData.getMovieById(req.params.movieId);
      res.json(movie);
    } catch (e) {
      res.status(404).json({ error: "Not Found" });
    }
  })
  .delete(async (req, res) => {
    try {
      const response = await moviesData.removeMovie(req.params.movieId);
      res.json(response);
    } catch (e) {
      res.status(404).json({ error: "Not Found" });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
  });

module.exports = router;
