const axios = require('axios');
const url = 'https://pokeapi.co/api/v2/pokemon/';

const buscarPokemons = async (req, res) => {
    const offset = req.query.offset;
    const limit = req.query.limit;

    const response = await axios.get(`${url}?offset=${offset}&limit=${limit}`);
    return res.json(response.data.results);
}

const buscarUmPokemon = async (req, res) => {
    const idOuNome = req.params.idOuNome;
    const response = await axios.get(`${url}${idOuNome}/`);
    console.log(response.data);
    return res.json({
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        base_experience: response.data.base_experience,
        forms: response.data.forms,
        abilities: response.data.abilities,
        species: response.data.species
    });
}

module.exports = {buscarPokemons, buscarUmPokemon};