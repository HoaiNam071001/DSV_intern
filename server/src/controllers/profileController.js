const User = require('../models/User');
const Follow = require('../models/Follow');
const c = require('config');

const Profile = (() => {
    const getprofile = async (req, res) => {
        
       // const { username } = req.query;
       let follow = null;
       let CurrentUser = await User.findOne({username:req.params.username});

       if(req.query._id){
            const id = { IdFollow : req.query._id, IdFollowed : String(CurrentUser._id) };
            follow = await Follow.findOne(id);
        }

        res.json({
            profile: {
                username: CurrentUser.username,
                bio: CurrentUser.bio,
                image: CurrentUser.avatar_img,
                following: follow?true:false,
            }
        });
    };
    const followUser = async (req, res) => {
        res.json({ message: 'followUser' });
    };
    const unfollowUser = async (req, res) => {
        res.json({ message: 'unfollowUser' });
    };

    return {
        getprofile,
        followUser,
        unfollowUser,
    };
})();

module.exports = Profile;
