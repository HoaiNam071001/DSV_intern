const Default = (() => {
  const getTags = async (req, res) => {
    res.json({ message: 'get Comments' });
  };

  return {
    getTags,
  };
})();

module.exports = Default;
