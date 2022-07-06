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

var server = app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${server.address().port}`);
});
// var io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });
// io.on("connection", (socket) => {
//   console.log(`connect: ${socket.id}`);
//   socket.on("hello!", () => {
//     console.log(`hello from ${socket.id}`);
//   });

//   socket.on("private message", ({ content, to }) => {
//     socket.to(to).emit("private message", {
//       content,
//       from: socket.id,
//     });
//   });
//   socket.on("disconnect", () => {
//     console.log(`disconnect: ${socket.id}`);
//   });
// });

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(cors());
// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   socket.username = username;
//   next();
// });

// io.on("connection", (socket) => {
//   // fetch existing users
//   //const users = [];
//   // for (let [id, socket] of io.of("/").sockets) {
//   //   users.push({
//   //     userID: id,
//   //     username: socket.username,
//   //   });
//   // }
//   // socket.emit("users", users);

//   // // notify existing users
//   // socket.broadcast.emit("user connected", {
//   //   userID: socket.id,
//   //   username: socket.username,
//   // });

//   // forward the private message to the right recipient
//   socket.on("private message", ({ content, to }) => {
//     socket.to(to).emit("private message", {
//       content,
//       from: socket.id,
//     });
//   });

//   // notify users upon disconnection
//   socket.on("disconnect", () => {
//     console.log("disconnect");
//     //socket.broadcast.emit("user disconnected", socket.id);
//   });
// });

//const morgan = require("morgan");
//app.use(morgan("combined"));

// define : post
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
route(app);

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
