const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { VerifyToken } = require('../middleware/Token');

router.get('/', VerifyToken, UserController.getCurrentUser);
router.put('/', VerifyToken, UserController.updateCurrentUser);
module.exports = router;
