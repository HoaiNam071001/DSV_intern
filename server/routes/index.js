const auth = require('./auth');
const user = require('./user');
const profile = require('./profile');
const articles = require('./articles');
// const defaults = require('./default');

function route(app) {
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use('/users', auth);
    
    app.use('/user', user);
    app.use('/profiles', profile);
    app.use('/articles', articles);
    // app.use('/tags', defaults);
    app.get('/',(req,res)=>{
        res.send('Hello World');
    });
}

module.exports = route;