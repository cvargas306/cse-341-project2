const express = require('express');

const cors = require('cors');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();
const MongoStore = require('connect-mongo');


const port = process.env.PORT || 3000;

app
    .use(session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL, // make sure it's in your .env on Render
            collectionName: 'sessions'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true
        }
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
app.use(cors());

app.use(express.json());

app.use('/', require('./routes'));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        console.log('GitHub Profile:', profile);
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        username: user.username,
        displayName: user.displayName
    });
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => {
    const user = req.session.user;
    if (user) {
        const name = user.displayName || user.username || 'GitHub User';
        res.send(`Logged in as ${name}`);
    } else {
        res.send("Logged-Out");
    }
});


app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: true
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, '0.0.0.0', () => { console.log(`Database is listening and node Running on port ${port}`) });
    }
});