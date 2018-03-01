const express = require('express');
const mongoose = require('mongoose');
require('./models/user');
require('./models/survey');
require('./services/passport');

const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');

const bodyParser = require('body-parser');




mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //Express serves up production assets like main.js and main.css
    app.use(express.static('client/build'));

    // Express serves up index.html if it doesn't find the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

