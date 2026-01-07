const express = require('express');
const router = express.Router();
const {getSpecialArticles, getLatestArticles, getArticlesByCategory, getNewspaperDetails, searchArticles} = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

router.get('/category/:slug', getArticlesByCategory);

router.get('/search', searchArticles);

router.get('/special', getSpecialArticles);

router.get('/nd/:id', getNewspaperDetails);

module.exports = router;