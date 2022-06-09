const Favorite = (() => {
  const favorite = async (req, res) => {
    res.json({ message: 'favorite' });
  };
  const unfavorite = async (req, res) => {
    res.json({ message: 'unfavorite' });
  };

  return {
    favorite,
    unfavorite,
  };
})();

module.exports = Favorite;
