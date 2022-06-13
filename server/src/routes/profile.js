const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');
const { CheckToken, VerifyToken } = require('../middleware/Token');

router.post('/:username/follow', VerifyToken, ProfileController.followUser);
router.delete('/:username/follow', VerifyToken, ProfileController.unfollowUser);
router.get('/:username', CheckToken, ProfileController.getprofile);

module.exports = router;
