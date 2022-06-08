const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/',UserController.getCurrentUser);
router.put('/',UserController.updateCurrentUser);
module.exports = router; 