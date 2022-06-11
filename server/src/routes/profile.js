const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');
const {CheckToken} = require('../middleware/Token');

router.post('/:slug/follow', ProfileController.followUser);
router.delete('/:slug/follow', ProfileController.unfollowUser);
router.get('/:username',CheckToken, ProfileController.getprofile);

module.exports = router;
