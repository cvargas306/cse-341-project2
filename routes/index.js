const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello, World!']
    res.send('Hello, Project 2 !');
});

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.use('/employees', require('./employees'));
router.use('/pokemon_types', require('./pokemonTypes'));

module.exports = router;
