const express = require('express');
const router = express.Router();
const {getLatestArticles, getArticlesByCategory, getNewspaperDetails, searchArticles} = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

router.get('/category/:slug', getArticlesByCategory);

router.get('/search', searchArticles);

router.get('/:slug', getNewspaperDetails);

module.exports = router;