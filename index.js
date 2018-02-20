const express = require('express');
require('./models/user');
require('./services/passport');
const keys = require('./config/prod');

const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [prod.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
