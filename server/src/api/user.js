const mongoose = require('mongoose');
const User = mongoose.model('User');

const user = (() => {
    const login = (req, res) => {
        try {
            const { email, password } = req.body.user;
            if (!email) throw { email: "can't be blank" };
            if (!password) throw { password: "can't be blank" };
            User.findOne({ email }).then((user) => {
                if (!user) throw { email: ['is invalid'] };
                if (!user.validPassword(password))
                    throw { password: ['is invalid'] };
                return res.json({ user: user.toAuthJSON() });
            });
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };
    const register = (req, res, next) => {
        try {
            const { username, email, password } = req.body.user;
            if (!username) throw { username: "can't be blank" };
            if (!email) throw { email: "can't be blank" };
            if (!password) throw { password: "can't be blank" };

            User.find()
                .or([{ username }, { email }])
                .then((users) => {
                    if (users.length === 0) {
                        var user = new User();
                        user.username = username;
                        user.email = email;
                        user.setPassword(password);
                        user.following = [user._id];
                        user.save().then(() =>
                            res.json({ user: user.toAuthJSON() }),
                        );
                        return;
                    }
                    var err = {
                        username: users.some((idx) => idx.username === username)
                            ? ['has already been taken']
                            : undefined,
                        email: users.some((idx) => idx.email === email)
                            ? ['has already been taken']
                            : undefined,
                    };
                    res.status(422).json({ errors: err });
                });
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };
    const getCurrentUser = (req, res, next) => {
        try {
            User.findById(req.payload.id)
                .then((user) => {
                    if (!user) return res.sendStatus(401);

                    return res.json({ user: user.toAuthJSON() });
                })
                .catch(next);
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };
    const updateCurrentUser = async (req, res, next) => {
        try {
            User.findById(req.payload.id)
                .then((user) => {
                    if (!user) return res.sendStatus(401);
                    const { username, email, bio, image, password } =
                        req.body.user;
                    if (username !== undefined) user.username = username;
                    if (email !== undefined) user.email = email;
                    if (bio !== undefined) user.bio = bio;
                    if (image !== undefined) user.image = image;
                    if (password !== undefined) user.setPassword(password);

                    user.save().then(() =>
                        res.json({ user: user.toAuthJSON() }),
                    );
                })
                .catch(next);
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
        login,
        register,
    };
})();

module.exports = user;
