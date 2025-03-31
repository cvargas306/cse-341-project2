const express = require('express');
const router = express.Router();

const pokemonTypesController = require('../controllers/pokemonTypes');
const validation = require('../middleware/validate');

router.get('/', pokemonTypesController.getAll);

router.get('/:id', pokemonTypesController.getSingle);

router.post('/', validation.savePokemonType, pokemonTypesController.createPokemonType);

router.put('/:id', validation.savePokemon, pokemonTypesController.updatePokemonType);

router.delete('/:id', pokemonTypesController.deletePokemonType);

module.exports = router;