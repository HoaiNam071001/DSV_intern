const express = require('express');
const app = express();
require('dotenv').config();
require('./models/User');
require('./models/Article');
require('./models/Comment');
const port = 3060;
const route = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./Db');
connectDB.Get();
app.use(cors());
app.use(morgan('combined'));

// define : post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});
var server = app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${server.address().port}`);
});

// const fileUpload = require('express-fileupload');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const path = require('path');

// app.use(cookieParser());
// // For store data in session
// app.use(session({
//     cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 },
//     secret: "S3cret",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(fileUpload());
// // Directory to views folder
// app.set('views', path.join(__dirname, 'resources/views'));
