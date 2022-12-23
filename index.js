import express from 'express';
import mongoose from 'mongoose';
import errors from './Middleware/errors.js';
import pokemons from './models/pokemon.js';

mongoose.connect('mongodb://localhost:27017/pokemonDB');

const app = express();
const port = 3000;

app.get('/pokemon', async (request, response) => {
  const { limit, offset } = request.query;

  const theLimit = +limit || 20;
  const theOffset = +offset || 0;

  const resLimit = await pokemons.aggregate([{ $skip: theOffset }, { $limit: theLimit }]);
  // const resLimit = await pokemons.find().skip(theOffset).limit(theLimit)
  return response.json(resLimit);
});

app.get('/pokemon/search', async (request, response) => {
  const { name, type } = request.query;

  if (name) {
    const thePokemon = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    // const resPokemon = await pokemons.aggregate([{$match:{name: thePokemon}}]);
    const resPokemon = await pokemons.find({ name: thePokemon });
    return response.json(resPokemon);
  }

  if (type) {
    const theType = type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
    // const resType = await pokemons.aggregate([{$match:{type: theType}}]);
    const resType = await pokemons.find({ type: theType });
    return response.json(resType);
  }
});

app.get('/pokemon/:name', async (request, response) => {
  const { name } = request.params;

  const thePokemon = name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  // const resPokemon = await pokemons.aggregate([{$match:{name: thePokemon}}]);
  const resPokemon = await pokemons.find({ name: thePokemon });
  return response.json(resPokemon);
});

app.use(errors, (request, response) => {
  return response.status(404).json({
    error: 'Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
