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

module.exports = {
    saveEmployee
};