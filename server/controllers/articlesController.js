
const Articles = (()=>{
    const getRecentArticlesUser = async (req,res) =>{
        res.json({message:'get Recent Articles User'});

    };
    const getRecentArticlesGlobal = async (req, res) => {
        res.json({message:'get Recent Articles Global'});
    };
    const createArticle = async (req, res) => {
        res.json({message:'create Article'});
    };
    const getArticle = async (req, res) => {
        res.json({message:'get Article'});
    };
    const updateArticle = async (req, res) => {
        res.json({message:'update Article'});
    };
    const deleteArticle = async (req, res) => {
        res.json({message:'delete Article'});
    };
    return {
        getRecentArticlesUser,
        getRecentArticlesGlobal,
        createArticle,
        getArticle,
        updateArticle,
        deleteArticle
    }
})();

module.exports = Articles;