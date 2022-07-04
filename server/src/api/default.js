const mongoose = require('mongoose');
const Article = mongoose.model('Article');

const Default = (() => {
    const getTags = async (req, res,next) => {
        try {
            Article.find().distinct('tagList').then((tags)=>res.json({tags: tags})).catch(next);
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
