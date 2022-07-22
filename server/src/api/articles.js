const { Article, User } = require('../services/mongoose');

const Articles = (() => {
    const getRecentArticlesFollow = (req, res, next) => {
        try {
            const { limit = 20, offset = 0 } = req.query;
            User.UserbyId(req.payload.id).then((user) => {
                if (!user) return res.sendStatus(401);
                const queryArticle = { author: { $in: user.following } };
                Article.getFollow(queryArticle, limit, offset)
                    .then(([articles, totalCount]) =>
                        res.json(Article.resultArticles({ articles, totalCount, user, limit, offset }))
                    )
                    .catch(next);
            });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };

    const getRecentArticlesGlobal = (req, res, next) => {
        try {
            const { limit = 20, offset = 0, favorited = null, tag = null, author = null } = req.query;
            const id = req.payload ? req.payload.id : null;
            var obj = {};
            if (tag) obj.tagList = { $in: [tag] };

            Article.getUsername(author, favorited)
                .then((results) => {
                    var favoriter = results[1];
                    if (results[0]) obj.author = results[0]._id;

                    if (favoriter) obj.favoriteList = { $in: [favoriter._id] };
                    else if (req.query.favorited) obj.favoriteList = { $in: [] };
                    Article.getGlobal(obj, id, limit, offset).then(([articles, totalCount, user]) => {
                        res.json(Article.resultArticles({ articles, totalCount, user, limit, offset }));
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
            User.UserbyId(id)
                .then((user) => {
                    if (!user) return res.sendStatus(401);
                    return Article.newArticle(req.body.article, user).then((article) => res.json(article));
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { article: [err] } });
        }
    };
    const getArticle = (req, res, next) => {
        try {
            Article.getArticle({ id: req.payload?.id, slug: req.params.slug_article })
                .then(([user, articles]) => {
                    if (!articles) return res.sendStatus(404);
                    return res.json({
                        article: articles.toJSONFor(user),
                    });
                })
                .catch(next);
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    const updateArticle = (req, res, next) => {
        try {
            const { title, description, body, tagList, thumbnail } = req.body.article,
                id = req.payload.id;
            Article.getArticle({ id: req.payload.id, slug: req.params.slug_article }).then(([user, article]) => {
                if (!user) return res.sendStatus(401);
                if (!article) return res.sendStatus(404);
                if (article.author._id.toString() !== id.toString()) return res.sendStatus(403);
                if (title !== undefined) article.title = title;
                if (description !== undefined) article.description = description;
                if (body !== undefined) article.body = body;
                if (tagList !== undefined) article.tagList = tagList;
                if (thumbnail !== undefined) article.thumbnail = thumbnail;
                article
                    .save()
                    .then((article) => res.json({ article: article.toJSONFor(user) }))
                    .catch(next);
            });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    const deleteArticle = (req, res) => {
        try {
            const id = req.payload.id;

            Article.ArticlefindOne({ slug: req.params.slug_article }).then((article) => {
                if (!article) return res.sendStatus(404);
                if (article.author._id.toString() === id.toString()) return article.remove().then(() => res.json({}));
                else return res.sendStatus(403);
            });
        } catch (error) {
            return res.status(422).json({ errors: { article: [error] } });
        }
    };
    return {
        getRecentArticlesFollow,
        getRecentArticlesGlobal,
        createArticle,
        getArticle,
        updateArticle,
        deleteArticle,
    };
})();

module.exports = Articles;
