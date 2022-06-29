const mongoose = require('mongoose');
const User = mongoose.model('User');
const Article = mongoose.model('Article');

const Favorites = (() => {
    const favorite = (req, res, next) => {
        try {
            const id = req.payload.id,
                slug = req.params.slug_article;
            Promise.all([
                User.findById(id),
                Article.findOne({ slug }).populate('author').exec(),
            ])
                .then((results) => {
                    if (!results[0]) return res.sendStatus(401);
                    if (!results[1]) return res.sendStatus(422);
                    return results[1].favorite(id).then((article) =>
                        res.json({
                            article: article.toJSONFor(results[0]),
                        }),
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
            Promise.all([
                User.findById(id),
                Article.findOne({ slug }).populate('author').exec(),
            ])
                .then((results) => {
                    if (!results[0]) {
                        return res.sendStatus(401);
                    }
                    if (!results[1]) return res.sendStatus(422);
                    return results[1].unfavorite(id).then((article) =>
                        res.json({
                            article: article.toJSONFor(results[0]),
                        }),
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
