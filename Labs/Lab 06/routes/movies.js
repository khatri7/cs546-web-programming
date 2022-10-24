const express = require("express");
const { moviesData } = require("../data");
const {
  sendErrResp,
  isValidMovieObject,
  isValidObjectId,
} = require("../helpers");

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
      } = isValidMovieObject(req.body);
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
      const _id = isValidObjectId(req.params.movieId);
      const movie = await moviesData.getMovieById(_id.toString());
      res.json(movie);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .delete(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.movieId);
      const response = await moviesData.removeMovie(_id.toString());
      res.json(response);
    } catch (e) {
      sendErrResp(res, e);
    }
  })
  .put(async (req, res) => {
    try {
      const _id = isValidObjectId(req.params.movieId);
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
      } = isValidMovieObject(req.body);
      const movie = await moviesData.updateMovie(
        _id.toString(),
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
