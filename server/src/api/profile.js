const { Profile } = require('../services/mongoose');

const Profiles = (() => {
    const getprofile = (req, res, next) => {
        try {
            const id = req.payload ? req.payload.id : null,
                username = req.params.username;
            Profile.getProfile(username, id)
                .then((results) => {
                    if (!results[0]) return res.status(404).json({ errors: { profile: ['Invalid'] } });
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
            Profile.getProfile(username, id)
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
            Profile.getProfile(username, id)
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

module.exports = Profiles;
