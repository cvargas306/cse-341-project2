const express = require('express');
const router = express.Router();

const pokemonTypesController = require('../controllers/pokemonTypes');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("/middleware/authenticate");

router.get('/', pokemonTypesController.getAll);

router.get('/:id', pokemonTypesController.getSingle);

router.post('/', isAuthenticated, validation.savePokemonType, pokemonTypesController.createPokemonType);

router.put('/:id', isAuthenticated, validation.savePokemonType, pokemonTypesController.updatePokemonType);

router.delete('/:id', isAuthenticated, pokemonTypesController.deletePokemonType);

module.exports = router;