const mongoose = require("mongoose");
const User = mongoose.model("User");

const Profile = (() => {
  const getprofile = (req, res, next) => {
    try {
      const id = req.payload ? req.payload.id : null,
        username = req.params.username;
      Promise.all([User.findOne({ username }), id ? User.findById(id) : null])
        .then((results) => {
          if (!results[0]) return res.sendStatus(422);
          return res.json({
            profile: results[0].toProfileJSONFor(results[1]),
          });
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { profile: [err] } });
    }
  };
  const followUser = (req, res, next) => {
    try {
      const id = req.payload.id,
        username = req.params.username;
      Promise.all([User.findOne({ username }), id ? User.findById(id) : null])
        .then((results) => {
          if (!results[0]) return res.sendStatus(422);
          if (!results[1]) return res.sendStatus(401);
          results[1].follow(results[0]._id).then(() =>
            res.json({
              profile: results[0].toProfileJSONFor(results[1]),
            })
          );
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { profile: [err] } });
    }
  };
  const unfollowUser = (req, res, next) => {
    try {
      const id = req.payload.id,
        username = req.params.username;
      Promise.all([User.findOne({ username }), id ? User.findById(id) : null])
        .then((results) => {
          if (!results[0]) return res.sendStatus(422);
          if (!results[1]) return res.sendStatus(401);
          results[1].unfollow(results[0]._id).then(() =>
            res.json({
              profile: results[0].toProfileJSONFor(results[1]),
            })
          );
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { profile: [err] } });
    }
  };

  return {
    getprofile,
    followUser,
    unfollowUser,
  };
})();

module.exports = Profile;
