const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getVideos);
router.get('/grouped', videoController.getVideosGroupedByCategory);

module.exports = router;