const Comment = (() => {
  const getComments = async (req, res) => {
    res.json({ message: 'get Comments' });
  };
  const createComments = async (req, res) => {
    res.json({ message: 'create Comments' });
  };
  const deleteComment = async (req, res) => {
    res.json({ message: 'delete Comment' });
  };

  return {
    getComments,
    createComments,
    deleteComment,
  };
})();

module.exports = Comment;
