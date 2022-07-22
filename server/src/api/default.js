const { getTag } = require('../services/mongoose');
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

    return {
        getTags,
    };
})();

module.exports = Default;
