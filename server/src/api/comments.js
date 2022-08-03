const { Article, Comment } = require('../services/mongoose');

const Comments = (() => {
    const getComments = async (req, res, next) => {
        try {
            const id = req.payload ? req.payload.id : null,
                slug = req.params.slug_article;
            Article.getArticle({ slug, id })
                .then(([user, article]) => {
                    if (!article) return res.sendStatus(404);
                    Comment.getComments(article._id).then((comments) => {
                        return res.json({
                            comments: comments.map((comment) => comment.toJSONFor(user)),
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
            if (!body) throw 'Not Body!';
            Article.getArticle({ slug, id })
                .then(([user, article]) => {
                    if (!user) return res.sendStatus(401);
                    if(!article) return res.sendStatus(404);
                    Comment.newComment(body, article, user).then((cmt) => res.json(cmt));
                })
                .catch(next);
        } catch (err) {
            res.status(422).json({ errors: { Comment: [err] } });
        }
    };

    const deleteComment = async (req, res, next) => {
        try {
            const id = req.payload.id,
                id_comment = req.params.id_comment;

            Comment.findComment(id_comment, id)
                .then(([comment, user]) => {
                    if (!user) return res.sendStatus(401);
                    if (!comment) return res.sendStatus(422);
                    if (comment.author.toString() !== id) return res.sendStatus(403);
                    return comment.remove().then(() => res.status(200).json({}));
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
