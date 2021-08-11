const express = require('express');
const {buscarCep} = require('./controladores/controladores');
const rotas = express();

rotas.get('/enderecos/:cep', buscarCep);

module.exports = rotas;