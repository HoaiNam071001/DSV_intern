const auth = require('./auth');
const user = require('./user');
const profile = require('./profile');
const articles = require('./articles');
const defaults = require('./default');

function route(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,content-type',
        );
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use('/api/users', auth);
    app.use('/api/user', user);
    app.use('/api/profiles', profile);
    app.use('/api/articles', articles);
    app.use('/api/', defaults);
}

module.exports = route;
