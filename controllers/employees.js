const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['employees']
    const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to see one.');
    }
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({ _id: employeeId });
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    });
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while adding employee');
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to update one.');
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating employee');
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to delete one.');
    }
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting employee');
    }
};

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};