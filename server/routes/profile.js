const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.post('/:slug/follow',ProfileController.followUser);
router.delete('/:slug/follow',ProfileController.unfollowUser);
router.get('/:slug',ProfileController.getprofile);

module.exports = router; 