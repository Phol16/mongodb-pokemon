import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  name: {type: String},
  type: {type: Array }
})

const pokemonModel = mongoose.model('pokemon_info', PokemonSchema)
export default pokemonModel