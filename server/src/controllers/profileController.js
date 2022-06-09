const Profile = (() => {
  const getprofile = async (req, res) => {
    res.json({ message: 'getprofile' });
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
