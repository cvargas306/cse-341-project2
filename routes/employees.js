const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');

router.get('/', employeesController.getAll);

router.get('/:id', employeesController.getSingle);

router.post('/', validation.saveEmployee, employeesController.createEmployee);

router.put('/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Must use a valid employee id to update one.' });
    }
    next(); // Only proceed if ID is valid
}, employeesController.updateEmployee);

router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;