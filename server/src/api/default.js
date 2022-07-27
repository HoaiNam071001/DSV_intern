const { getTag, Searchs } = require('../services/mongoose');
const Default = (() => {
    const getTags = async (req, res, next) => {
        try {
            getTag()
                .then((tags) => res.json({ tags }))
                .catch(next);
        } catch (err) {
            res.status(422).json({
                errors: {
                    tags: [err],
                },
            });
        }
    };
    const Search = (req, res, next) => {
        const keyword = req.query.keyword,
            id = req.payload ? req.payload.id : null;
        Searchs(keyword, id)
            .then((result) => res.json(result))
            .catch(next);
    };
    return {
        getTags,
        Search,
    };
})();

module.exports = Default;
