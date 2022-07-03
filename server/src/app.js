const express = require("express");
const app = express();
require("dotenv").config();
require("./models/User");
require("./models/Article");
require("./models/Comment");
const port = 3060;
const route = require("./routes");
const cors = require("cors");
const connectDB = require("./Db");
connectDB();
const io = require("socket.io");
app.use(cors());

//const morgan = require("morgan");
//app.use(morgan("combined"));

// define : post
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
route(app);
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      error: [err.message],
    },
  });
});
var server = app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${server.address().port}`);
});
