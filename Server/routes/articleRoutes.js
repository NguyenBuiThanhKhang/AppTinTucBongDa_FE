const express = require('express');
const router = express.Router();
const {getLatestArticles, getArticlesByCategory, getNewspaperDetails} = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

router.get('/:slug', getNewspaperDetails);

router.get('/category/:slug', getArticlesByCategory);

module.exports = router;