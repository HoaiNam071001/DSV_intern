const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.get('/tags', defaultController.getTags);
module.exports = router;
