const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const user = (() => {
    const getCurrentUser = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let CurrentUser = req.query.email;
            CurrentUser = await User.findOne({ CurrentUser });
            jwt.sign(
                { email: CurrentUser.email },
                config.get('JWTsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw 'err';
                    res.json({
                        user: {
                            email: CurrentUser.email,
                            username: CurrentUser.username,
                            bio: CurrentUser.bio,
                            image: CurrentUser.avatar_img,
                            token,
                        },
                    });
                },
            );
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };
    const updateCurrentUser = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, username, bio, image } =
                req.body.user || req.params.user || req.query.user;

            await User.updateOne(
                { email },
                {
                    username,
                    email,
                    avatar_img: image,
                    bio,
                },
            );

            jwt.sign(
                { email },
                config.get('JWTsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw 'err';
                    res.json({
                        user: {
                            email,
                            username,
                            bio,
                            image,
                            token,
                        },
                    });
                },
            );
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };

    return {
        getCurrentUser,
        updateCurrentUser,
    };
})();

module.exports = user;
