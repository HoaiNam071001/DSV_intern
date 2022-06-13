const ArticleModel = require('../models/Article');

const Default = (() => {
    const getTags = async (req, res) => {
        try {
            var result = [];
            const tags = await ArticleModel.find();
            for (var i = 0; i < tags.length; i++) {
                for (var j = 0; j < tags[i].Tags.length; j++) {
                    if(!result.includes(tags[i].Tags[j])) 
                        result.push(tags[i].Tags[j]);
                }
            }
            res.json(result);
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
