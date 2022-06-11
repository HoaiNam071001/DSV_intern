const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const CheckToken = require('../middleware/CheckToken');

router.get('/', CheckToken, UserController.getCurrentUser);
router.put('/', CheckToken, UserController.updateCurrentUser);
module.exports = router;
