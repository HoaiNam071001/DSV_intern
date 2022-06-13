const CommentModel = require('../models/Comment');
const UserModel = require('../models/User');
const ArticleModel = require('../models/Article');
const FollowModel = require('../models/Follow');
const { validationResult } = require('express-validator');

const Comment = (() => {
    const getComments = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            var isfollow = null,
                UserCmt = null;
            const clientId = req.query.token ? req.query.token._id : null,
                slug_article = req.params.slug_article;

            // check article slug
            const article = await ArticleModel.findOne({ slug: slug_article });
            if (!article) throw 'article not valid';
            // get data comment of article
            const comments = await CommentModel.find({
                IdArticle: article._id,
            });

            var result = [];
            // config data
            for (var i = 0; i < comments.length; i++) {
                isfollow = null;
                if (clientId)
                    isfollow = await FollowModel.findOne({
                        IdFollow: clientId,
                        IdFollowed: comments[i].IdSender,
                    });
                UserCmt = await UserModel.findById(comments[i].IdSender);
                result.push({
                    id: comments[i]._id,
                    createdAt: comments[i].createdAt,
                    updatedAt: comments[i].updatedAt,
                    body: comments[i].Body,
                    author: {
                        username: UserCmt.username,
                        bio: UserCmt.bio,
                        image: UserCmt.avatar_img,
                        following: isfollow ? true : false,
                    },
                });
            }
            res.json({ comments: result });
        } catch (err) {
            res.status(422).json({ errors: { Comment: [err] } });
        }
    };
    const createComments = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.body.comment) throw 'Not body';

            const clientId = req.query.token._id,
                { body } = req.body.comment,
                slug_article = req.params.slug_article;

            // check user
            const client = await UserModel.findById(clientId);
            if (!client) throw 'User not valid';
            // check article
            const article = await ArticleModel.findOne({ slug: slug_article });
            if (!article) throw 'article not valid';

            // create comment
            const comment = new CommentModel({
                IdSender: clientId,
                IdArticle: article._id,
                Body: body,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            // save comment
            await comment.save().then((result) => {
                res.json({
                    comment: {
                        id: result._id,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt,
                        body: result.Body,
                        author: {
                            username: client.username,
                            bio: client.bio,
                            image: client.avatar_img,
                            following: false,
                        },
                    },
                });
            });
        } catch (err) {
            res.status(422).json({ errors: { Comment: [err] } });
        }
    };

    const deleteComment = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const clientId = req.query.token._id,
                slug_article = req.params.slug_article,
                id_comment = req.params.id_comment;

            // check article slug
            const article = await ArticleModel.findOne({ slug: slug_article });
            if (!article) throw 'article not valid';
            // check comment
            const comments = await CommentModel.findById(id_comment);
            if (!comments) throw 'comment not valid';
            // check authentication
            if (
                comments.IdArticle != String(article._id) ||
                comments.IdSender != clientId
            )
                throw 'miss authentication credentials';
            // delete
            await CommentModel.deleteOne({ _id: id_comment });
            res.json({});
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

module.exports = Comment;
