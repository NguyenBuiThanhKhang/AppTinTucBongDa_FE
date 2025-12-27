const express = require('express');
const router = express.Router();
const { getLatestArticles, getNewspaperDetails } = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

router.get('/nd/:id', getNewspaperDetails);

module.exports = router;