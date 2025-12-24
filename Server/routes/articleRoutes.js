const express = require('express');
const router = express.Router();
const { getLatestArticles } = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

module.exports = router;