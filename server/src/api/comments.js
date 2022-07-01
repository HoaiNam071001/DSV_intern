const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const Article = mongoose.model("Article");

const Comments = (() => {
  const getComments = async (req, res, next) => {
    try {
      const id = req.payload ? req.payload.id : null,
        slug = req.params.slug_article;
      Promise.all([Article.findOne({ slug }), id ? User.findById(id) : null])
        .then((results) => {
          if (!results[0]) return res.sendStatus(422);
          Comment.find({ article: results[0]._id })
            .sort({ createdAt: "desc" })
            .populate("author")
            .exec()
            .then((comments) => {
              return res.json({
                comments: comments.map((comment) =>
                  comment.toJSONFor(results[1])
                ),
              });
            });
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { Comment: [err] } });
    }
  };
  const createComments = async (req, res, next) => {
    try {
      const id = req.payload.id,
        body = req.body.comment,
        slug = req.params.slug_article;
      if (!body) throw "Not Body!";
      Promise.all([Article.findOne({ slug }), User.findById(id)])
        .then((results) => {
          if (!results[1]) {
            return res.sendStatus(401);
          }
          var comment = new Comment(body);
          comment.article = results[0];
          comment.author = results[1];
          return comment.save().then(() =>
            res.json({
              comment: comment.toJSONFor(results[1]),
            })
          );
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { Comment: [err] } });
    }
  };

  const deleteComment = async (req, res, next) => {
    try {
      const id = req.payload.id,
        slug = req.params.slug_article,
        id_comment = req.params.id_comment;

      Promise.all([Comment.findById(id_comment), User.findById(id)])
        .then((results) => {
          if (!results[1]) {
            return res.sendStatus(401);
          }
          if (!results[0]) {
            return res.sendStatus(422);
          }
          if (results[0].author.toString() !== id) {
            return res.sendStatus(403);
          }
          return results[0].remove().then(() => res.status(200).json({}));
        })
        .catch(next);
    } catch (err) {
      res.status(422).json({ errors: { Comment: [err] } });
    }
  };

  return {
    getComments,
    createComments,
    deleteComment,
  };
})();

module.exports = Comments;
