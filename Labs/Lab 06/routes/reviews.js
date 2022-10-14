//require express and express router as shown in lecture code
const express = require("express");

const router = express.Router();

router
  .route("/:movieId")
  .get(async (req, res) => {
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
  });

router
  .route("/review/:reviewId")
  .get(async (req, res) => {
    //code here for GET
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

module.exports = router;
