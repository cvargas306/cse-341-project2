const validator = require('../helpers/validate');

const saveEmployee = (req, res, next) => {
    const isUpdate = req.method === 'PUT';

    const validationRule = {
        name: isUpdate ? 'string' : 'required|string',
        age: isUpdate ? 'numeric' : 'required|numeric',
        gender: isUpdate ? 'string' : 'required|string',
        designation: isUpdate ? 'string' : 'required|string',
        department: isUpdate ? 'string' : 'required|string',
        salary: isUpdate ? 'numeric' : 'required|numeric',
        seniority: isUpdate ? 'string' : 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });

        } else {
            next();
        }
    });
};

const savePokemonType = (req, res, next) => {
    const isUpdate = req.method === 'PUT';
    const validationRule = {
        english: isUpdate ? 'string' : 'required|string',
        chinese: isUpdate ? 'string' : 'required|string',
        japanese: isUpdate ? 'string' : 'required|string',
        effective: 'array',
        ineffective: 'array',
        no_effect: 'array'
    };


    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveEmployee,
    savePokemonType
};