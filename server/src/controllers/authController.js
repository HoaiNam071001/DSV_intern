const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const UserModel = require('../models/User');

const users = (() => {
    const login = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body.user;
            if (email == null || password == null) throw 'Info not valid';
            let user = await UserModel.findOne({ email });
            if (!user) {
                throw { Email: ['is invalid'] };
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw { password: ['is invalid'] };
            }
            jwt.sign(
                { _id: user._id },
                config.get('JWTsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw 'err';
                    res.json({
                        user: {
                            email: user.email,
                            username: user.username,
                            bio: user.bio,
                            image: user.avatar_img,
                            token,
                        },
                    });
                },
            );
        } catch (err) {
            res.status(422).json({ errors: err });
        }
    };
    const register = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { username, email, password } = req.body.user;
            if (username == null || email == null || password == null)
                throw 'Info not valid';
            let _username = await UserModel.findOne({ username });
            let _email = await UserModel.findOne({ email });

            if (_username && _email)
                throw {
                    email: ['has already been taken'],
                    username: ['has already been taken'],
                };

            if (_username) throw { username: ['has already been taken'] };

            if (_email) throw { email: ['has already been taken'] };

            let user = new UserModel({
                username,
                email,
                password,
                avatar_img: '',
                bio: '',
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            jwt.sign(
                { _id: user._id },
                config.get('JWTsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw 'err';
                    res.json({
                        user: {
                            email,
                            username,
                            bio: '',
                            image: '',
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
        login,
        register,
    };
})();

module.exports = users;
