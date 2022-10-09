//Your data modules to make the Axios calls and get the data

const { GET } = require("../helpers");

const pokemon = async () => GET("https://pokeapi.co/api/v2/pokemon");

const pokemonById = async (id) =>
  GET(`https://pokeapi.co/api/v2/pokemon/${id}`);

module.exports = {
  pokemon,
  pokemonById,
};
