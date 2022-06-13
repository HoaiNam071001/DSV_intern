const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
const commentsController = require('../controllers/commentsController');
const favoritesController = require('../controllers/favoritesController');
const { VerifyToken, CheckToken } = require('../middleware/Token');

router.get('/feed', VerifyToken, articlesController.getRecentArticlesUser);
router.get('/', CheckToken, articlesController.getRecentArticlesGlobal);
router.post('/', VerifyToken, articlesController.createArticle);
router.get('/:slug_article', CheckToken, articlesController.getArticle);
router.put('/:slug_article', VerifyToken, articlesController.updateArticle);
router.delete('/:slug_article', VerifyToken, articlesController.deleteArticle);

router.get('/:slug/comments', CheckToken, commentsController.getComments);
router.post(
    '/:slug_article/comments',
    VerifyToken,
    commentsController.createComments,
);
router.delete(
    '/:slug_article/comments/:id_comment',
    VerifyToken,
    commentsController.deleteComment,
);

router.post(
    '/:slug_article/favorite',
    VerifyToken,
    favoritesController.favorite,
);
router.delete(
    '/:slug_article/favorite',
    VerifyToken,
    favoritesController.unfavorite,
);

module.exports = router;
