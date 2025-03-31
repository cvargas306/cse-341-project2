const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['pokemon_types']
    try {
        const result = await mongodb.getDatabase().db().collection('pokemon_types').find();
        const pokemonTypes = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pokemonTypes);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching pokemon type.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['pokemon_types']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid Pokemon Type ID.' });
    }
    try {
        const pokemonId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('pokemon_types').findOne({ _id: pokemonId });
        if (!result) {
            return res.status(404).json({ error: 'Pokemon type not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching the Pokemon type.' });
    }
};

const createPokemonType = async (req, res) => {
    //#swagger.tags=['pokemon_types']
    const pokemonType = {
        english: req.body.english,
        chinese: req.body.chinese,
        japanese: req.body.japanese,
        effective: Array.isArray(req.body.effective) ? req.body.effective : [],
        ineffective: Array.isArray(req.body.ineffective) ? req.body.ineffective : [],
        no_effect: Array.isArray(req.body.no_effect) ? req.body.no_effect : []
    };
    try {
        const response = await mongodb.getDatabase().db().collection('pokemon_types').insertOne(pokemonType);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Pokemon type created successfully', pokemonTypeId: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the pokemon type' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while adding the pokemon.' });
    }
};

const updatePokemonType = async (req, res) => {
    //#swagger.tags=['pokemon_types']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid pokemon id to update one.');
    }
    const pokemonId = new ObjectId(req.params.id);
    const pokemonType = {
        english: req.body.english,
        chinese: req.body.chinese,
        japanese: req.body.japanese,
        effective: Array.isArray(req.body.effective) ? req.body.effective : [],
        ineffective: Array.isArray(req.body.ineffective) ? req.body.ineffective : [],
        no_effect: Array.isArray(req.body.no_effect) ? req.body.no_effect : []
    };
    try {
        const response = await mongodb.getDatabase().db().collection('pokemon_types').replaceOne({ _id: pokemonId }, pokemonType);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Pokemon updated successfully' });
        } else {
            res.status(404).json({ error: 'Pokemon not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while updating the pokemon.' });
    }
};

const deletePokemonType = async (req, res) => {
    //#swagger.tags=['pokemon_types']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid pokemon id to delete one.');
    }
    try {
        const pokemonId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('pokemon_types').deleteOne({ _id: pokemonId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Pokemon deleted successfully' });
        } else {
            res.status(404).json({ error: 'Pokemon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while deleting the pokemon.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPokemonType,
    updatePokemonType,
    deletePokemonType
};