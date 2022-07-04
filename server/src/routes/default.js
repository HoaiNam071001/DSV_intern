const express = require('express');
const router = express.Router();
const defaults = require('../api/default');

router.get('/tags', defaults.getTags);
module.exports = router;
