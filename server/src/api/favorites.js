const { Article } = require('../services/mongoose');

const Favorites = (() => {
    const favorite = (req, res, next) => {
        try {
            const id = req.payload.id,
                slug = req.params.slug_article;
            Article.getArticle({ id, slug })
                .then(([user, article]) => {
                    if (!user) return res.sendStatus(401);
                    if (!article) return res.sendStatus(422);
                    return article.favorite(id).then((article) =>
                        res.json({
                            article: article.toJSONFor(user),
                        })
                    );
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { Favorite: [err] } });
        }
    };
    const unfavorite = (req, res, next) => {
        try {
            const id = req.payload.id,
                slug = req.params.slug_article;
            Article.getArticle({ id, slug })
                .then(([user, article]) => {
                    if (!user) {
                        return res.sendStatus(401);
                    }
                    if (!article) return res.sendStatus(422);
                    return article.unfavorite(id).then((article) =>
                        res.json({
                            article: article.toJSONFor(user),
                        })
                    );
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { Favorite: [err] } });
        }
    };
    return {
        favorite,
        unfavorite,
    };
})();

module.exports = Favorites;
