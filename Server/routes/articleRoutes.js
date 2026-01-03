const express = require('express');
const router = express.Router();
const {getLatestArticles, getArticlesByCategory, getNewspaperDetails} = require('../controllers/articleController');

router.get('/latest', getLatestArticles);

router.get('/nd/:id', getNewspaperDetails);

router.get('/category/:slug', getArticlesByCategory);

module.exports = router;