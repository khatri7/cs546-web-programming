//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require("express");
const { pokemon } = require("../data");

const router = express.Router();

router.route("/:id").get(async (req, res) => {
  try {
    const pokemonData = await pokemon.pokemonById(req.params.id);
    res.json(pokemonData);
  } catch (e) {
    res.status(e.response.status).json({ message: e.response.statusText });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const pokemonData = await pokemon.pokemon();
    res.json(pokemonData);
  } catch (e) {
    res.status(e.response.status).json({ message: e.response.statusText });
  }
});

module.exports = router;
