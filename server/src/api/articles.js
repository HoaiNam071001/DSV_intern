const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');

const Articles = (() => {
    const getRecentArticlesUser = (req, res, next) => {
        try {
            const { limit = 20, offset = 0 } = req.query;
            User.findById(req.payload.id).then((user) => {
                if (!user) return res.sendStatus(401);
                Article.find({ author: { $in: user.following } })
                    .sort({ createdAt: 'desc' })
                    .limit(Number(limit))
                    .skip(Number(offset))
                    .populate('author')
                    .exec()
                    .then((articles) =>
                        res.json({
                            articles: articles.map((article) =>
                                article.toJSONFor(user),
                            ),
                            articlesCount: articles.length,
                        }),
                    )
                    .catch(next);
            });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };

    const getRecentArticlesGlobal = (req, res, next) => {
        try {
            const {
                limit = 20,
                offset = 0,
                favorited = null,
                tag = null,
                author = null,
            } = req.query;
            const id = req.payload ? req.payload.id : null;
            var obj = {};
            if (tag) obj.tagList = { $in: [tag] };

            Promise.all([
                author ? User.findOne({ username: author }) : null,
                favorited ? User.findOne({ username: favorited }) : null,
            ])
                .then((results) => {
                    var favoriter = results[1];
                    if (results[0]) obj.author = results[0]._id;

                    if (favoriter) obj.favoriteList = { $in: [favoriter._id] };
                    else if (req.query.favorited)
                        obj.favoriteList = { $in: [] };
                    Promise.all([
                        Article.find(obj)
                            .sort({ createdAt: 'desc' })
                            .limit(Number(limit))
                            .skip(Number(offset))
                            .populate('author')
                            .exec(),
                        Article.count(obj).exec(),
                        id ? User.findById(id) : null,
                    ]).then((results) => {
                        const articles = results[0],
                            articlesCount = results[1],
                            user = results[2];

                        res.json({
                            articles: articles.map((article) =>
                                article.toJSONFor(user),
                            ),
                            articlesCount: articlesCount,
                        });
                    });
                })
                .catch(next);
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };

    const createArticle = (req, res, next) => {
        try {
            const id = req.payload.id;
            if (!req.body.article) throw 'Not body';
            User.findById(id)
                .then((user) => {
                    if (!user) {
                        return res.sendStatus(401);
                    }
                    var article = new Article(req.body.article);
                    article.author = user;

                    return article
                        .save()
                        .then(() =>
                            res.json({ article: article.toJSONFor(user) }),
                        );
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { article: [err] } });
        }
    };
    const getArticle = (req, res, next) => {
        try {
            const slug = req.params.slug_article,
                id = req.payload.id;

            Promise.all([
                id ? User.findById(id) : null,
                Article.findOne({ slug }).populate('author').exec(),
            ])
                .then(function (results) {
                    if (!results[1]) return res.sendStatus(422);
                    return res.json({
                        article: results[1].toJSONFor(results[0]),
                    });
                })
                .catch(next);
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    const updateArticle = (req, res, next) => {
        try {
            const { title, description, body, tagList } = req.body.article,
                slug = req.params.slug_article,
                id = req.payload.id;
            Promise.all([
                Article.findOne({ slug }).populate('author').exec(),
                User.findById(id),
            ]).then((results) => {
                if (!results[1]) return res.sendStatus(401);
                if (!results[0]) return res.sendStatus(422);
                if (results[0].author._id.toString() !== id.toString())
                    return res.sendStatus(403);
                if (title !== undefined) results[0].title = title;
                if (description !== undefined)
                    results[0].description = description;
                if (body !== undefined) results[0].body = body;
                if (tagList !== undefined) results[0].tagList = tagList;

                results[0]
                    .save()
                    .then((article) =>
                        res.json({ article: article.toJSONFor(results[1]) }),
                    )
                    .catch(next);
            });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    const deleteArticle = (req, res) => {
        try {
            const slug = req.params.slug_article,
                id = req.payload.id;

            Article.findOne({ slug })
                .populate('author')
                .exec()
                .then((article) => {
                    if (!article) return res.sendStatus(422);
                    if (article.author._id.toString() === id.toString())
                        return article.remove().then(() => res.json({}));
                    else return res.sendStatus(403);
                });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    return {
        getRecentArticlesUser,
        getRecentArticlesGlobal,
        createArticle,
        getArticle,
        updateArticle,
        deleteArticle,
    };
})();

module.exports = Articles;
