const Usermodel = require('../models/User');
const Followmodel = require('../models/Follow');

const Profile = (() => {
    const getprofile = async (req, res) => {
        try {
            let follow = null;
            let CurrentUser = await Usermodel.findOne({
                username: req.params.username,
            });

            if (req.query.token._id) {
                const id = {
                    IdFollow: req.query.token._id,
                    IdFollowed: String(CurrentUser._id),
                };
                follow = await Followmodel.findOne(id);
            }

            res.json({
                profile: {
                    username: CurrentUser.username,
                    bio: CurrentUser.bio,
                    image: CurrentUser.avatar_img,
                    following: follow ? true : false,
                },
            });
        } catch (err) {
            res.status(422).json({ errors: { profile: [err] } });
        }
    };
    const followUser = async (req, res) => {
        try {
            const client = req.query.token._id;
            let CurrentUser = await Usermodel.findOne({
                username: req.params.username,
            });
            if (client === String(CurrentUser._id)) throw 'Auth!';
            const isfollow = await Followmodel.findOne({
                IdFollow: client,
                IdFollowed: String(CurrentUser._id),
            });
            if (isfollow) throw 'Following!';

            const follow = new Followmodel({
                IdFollow: client,
                IdFollowed: String(CurrentUser._id),
                createdAt: Date.now(),
            });
            await follow.save();

            res.json({
                profile: {
                    username: CurrentUser.username,
                    bio: CurrentUser.bio,
                    image: CurrentUser.avatar_img,
                    following: true,
                },
            });
        } catch (err) {
            res.status(422).json({ errors: { profile: [err] } });
        }
    };
    const unfollowUser = async (req, res) => {
        try {
            const client = req.query.token._id;
            let CurrentUser = await Usermodel.findOne({
                username: req.params.username,
            });
            const isfollow = await Followmodel.findOne({
                IdFollow: client,
                IdFollowed: String(CurrentUser._id),
            });
            if (!isfollow) throw 'Unfollowed!';
            await Followmodel.deleteOne(isfollow);

            res.json({
                profile: {
                    username: CurrentUser.username,
                    bio: CurrentUser.bio,
                    image: CurrentUser.avatar_img,
                    following: false,
                },
            });
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
