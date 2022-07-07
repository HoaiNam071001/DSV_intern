const auth = require("./auth");
const user = require("./user");
const profile = require("./profile");
const articles = require("./articles");
const defaults = require("./default");

function route(app) {
  app.use("/api/users", auth);
  app.use("/api/user", user);
  app.use("/api/profiles", profile);
  app.use("/api/articles", articles);
  app.use("/api/", defaults);
}

module.exports = route;
