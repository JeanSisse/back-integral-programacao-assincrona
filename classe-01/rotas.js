const express = require('express');
const {buscarPokemons, buscarUmPokemon} = require('./controlador/controladores');
const rotas = express();

rotas.get('/pokemon', buscarPokemons);
rotas.get('/pokemon/:idOuNome', buscarUmPokemon);

module.exports = rotas;