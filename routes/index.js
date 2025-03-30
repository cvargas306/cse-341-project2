const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello, World!']
    res.send('Hello, Project 2 !');
});

router.use('/employees', require('./employees'));

module.exports = router;
