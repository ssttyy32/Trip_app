const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const config = require('./config');
const User = require('./')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));
app.use(express.static('./frontend/src/'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/register').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/spots/:cityName').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/spots/custom/:cityName').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/spots/custom/confirm/:cityName').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/spots/custom/confirm/personalize/:cityName').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login/:userID').get(function(req, res) {
    return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
// app.route('/dashboard').get(function(req,res) {
//   return res.sendFile(path.join(__dirname, './backend/static/index.html'));
// })

/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
    keys: ['443f89186468fd4s86', '443f89186468fd4s86']
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));
app.use('/api', require('./backend/routes/spot')(router));
app.use('/api', require('./backend/routes/dest')(router));
app.use('/api', require('./backend/routes/user')(router));

/* =========================================================================== */

// start the server
app.listen(process.env.PORT || 8080, () => {
    ('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
