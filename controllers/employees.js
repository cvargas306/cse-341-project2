const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['employees']
    try {
        const result = await mongodb.getDatabase().db().collection('employees').find();
        const employees = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching employees.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to find one.');
    }
    try {
        const employeeId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('employees').findOne({ _id: employeeId });
        if (!result) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while fetching the employee.' });
    }
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    const employee = {
        name: req.body.name,
        age: parseInt(req.body.age, 10),
        gender: req.body.gender,
        designation: req.body.designation,
        department: req.body.department,
        salary: parseInt(req.body.salary, 10),
        seniority: req.body.seniority
    };
    try {
        const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Employee created successfully', employeeId: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while adding the employee' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while adding the employee.' });
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid employee id to update one.' });
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        name: req.body.name,
        age: parseInt(req.body.age, 10),
        gender: req.body.gender,
        designation: req.body.designation,
        department: req.body.department,
        salary: parseInt(req.body.salary, 10),
        seniority: req.body.seniority
    };
    try {
        const response = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Employee updated successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while updating the employee.' });
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['employees']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid employee id to delete one.');
    }

    try {
        const employeeId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || 'An error occurred while deleting the employee.' });
    }
};


module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};