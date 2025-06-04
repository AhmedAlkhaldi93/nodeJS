// Contents of api/snippets.js

import express from 'express'
const router = express.Router()

// GET /api/snippets
router.get("/", async (request, response) => {
  const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const pokemonList = await pokemonData.json();

    response.send(
        `Here is a list of pokemon name:  ${pokemonList.results.map(p => p.name).join(' - ')}`
    )
})

//query-parameters 
router.get("/query-parameters", async (req, res) => {
    console.log(req.query.limit);
    console.log(req.query.offset);
    console.log(req.query.name);
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${req.query.limit}&offset=${req.query.offset}&name=${req.query.name}`);
    const pokemonList = await pokemonData.json();

    res.send(
        `Here is a list of pokemon name:  ${pokemonList.results.map(p => p.name).join(' - ')}`
    )
})

//parameters 
router.get("/parameters/:name", async (req, res) => {
    console.log(req.params.name);

    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`);
    const pokemonList = await pokemonData.json();

    res.send(
        `Here is a list of pokemon name:  ${pokemonList.results.map(p => p.name).join(' - ')}`
    )
})

// TODO: POST /api/snippets
// TODO: GET /api/snippets/:id

export default router