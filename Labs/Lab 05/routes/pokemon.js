//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require("express");
const { pokemon } = require("../data");
const { errResp, isValidId } = require("../helpers");

const router = express.Router();

router.route("/:id").get(async (req, res) => {
  try {
    const pokeId = isValidId(req.params.id);
    const pokemonData = await pokemon.pokemonById(pokeId);
    res.json(pokemonData);
  } catch (e) {
    errResp(e, res, "Pokémon Not Found!");
  }
});

router.route("/").get(async (_req, res) => {
  try {
    const pokemonData = await pokemon.pokemon();
    res.json(pokemonData);
  } catch (e) {
    errResp(e, res);
  }
});

module.exports = router;
