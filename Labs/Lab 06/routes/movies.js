const express = require("express");
const { moviesData } = require("../data");
const { sendErrResp } = require("../helpers");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const movies = await moviesData.getAllMovies();
      res.json(movies);
    } catch (e) {
      sendErrResp(res, e);
    }
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
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  });

router
  .route("/:movieId")
  .get(async (req, res) => {
    try {
      const movie = await moviesData.getMovieById(req.params.movieId);
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .delete(async (req, res) => {
    try {
      const response = await moviesData.removeMovie(req.params.movieId);
      res.json(response);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .put(async (req, res) => {
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
      const movie = await moviesData.updateMovie(
        req.params.movieId,
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
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  });

module.exports = router;
