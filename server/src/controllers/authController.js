const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
// const { validationResult } = require('express-validator');
const User = require('../models/User');

const users = (() => {
    //   const getAuthUser = async (req, res) => {
    //     try {
    //       const user = await User.findById(req.user.id).select('-password');
    //       res.json(user);
    //     } catch (err) {
    //       console.error(err.message);
    //       res.status(500).send('Server Error');
    //     }
    //   };
    const login = async (req, res) => {
        //res.json({ message: 'login' });
        let user = await User.findOne({ username: 'username' });
        let id = String(user._id);
        res.json({ user, id });
        //     const { username, password } = req.body;
        //     try{

        //       //check exist
        //       let user = await User.findOne({ username });
        //       if (!user) {
        //         return res.json({ userError: 'User do not exist! Please try again.', passError:'' });
        //       }
        //       //check right pwd
        //       const isMatch = await bcrypt.compare(password, user.password);
        //       if (!isMatch) {
        //         return res.json({ userError:'',passError: 'Not correct password! Please try again' });
        //       }
        //       //return no fault
        //        return res.json({userError:'',passError: ''});
        //     }
        //     catch{
        //       console.error(err.message);
        //       res.status(500).send('Server Error');
        //     }
    };
    const register = async (req, res) => {
        
        const { username, email, password } = req.body;
        try {
            let _username = await User.findOne({ username });
            let _email = await User.findOne({ email });

            if (_username && _email)
                throw {"email":["has already been taken"],"username":["has already been taken"]};
            
            if (_username ) 
                throw {"username":["has already been taken"]};
        
            if (_email) 
                throw {"username":["has already been taken"]};
            
            let user = new User({
                username,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    email: user.id,
                    username,
                    bio: null,
                    image: null,
                    token: "ff"   
                }
            };

            jwt.sign(
                payload,
                config.get('JWTsecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({user: {
                        email: user.id,
                        username,
                        bio: null,
                        image: null,
                        token  
                    }});
                },
            );
        } catch (err) {
            res.status(422).json({"errors":err});
        }
    };
    //   const uploadAvatar = async (req, res) => {
    //     const { username,imageUrl} = req.body;
    //     try {
    //       let user = await User.findOne({ username });

    //       if (!user) {
    //         return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    //       }
    //       const update={
    //         $set:{"avatar_img":imageUrl}
    //       }
    //       const result=await User.updateOne({username:username},update);
    //       res.json({ imageUrl });
    //     } catch (err) {
    //       console.error(err.message);
    //       res.status(500).send('Server error');
    //     }
    //   };

    return {
        login,
        register,
    };
})();

module.exports = users;
