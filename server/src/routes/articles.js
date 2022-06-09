const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');
const commentsController = require('../controllers/commentsController');
const favoritesController = require('../controllers/favoritesController');

router.get('/feed', articlesController.getRecentArticlesUser);
router.get('/', articlesController.getRecentArticlesGlobal);
router.post('/', articlesController.createArticle);
router.get('/:slug', articlesController.getArticle);
router.put('/:slug', articlesController.updateArticle);
router.delete('/:slug', articlesController.deleteArticle);

router.get('/:slug/comments', commentsController.getComments);
router.post('/:slug/comments', commentsController.createComments);
router.delete('/:slug/comments/:slug', commentsController.deleteComment);

router.post('/:slug/favorite', favoritesController.favorite);
router.delete('/:slug/favorite', favoritesController.unfavorite);

module.exports = router;
