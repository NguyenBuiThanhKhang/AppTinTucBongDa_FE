const express = require('express');
const {login, register, toggleSaveArticle, getSavedArticles} = require("../controllers/userController");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/registers', register);
router.post('/toggle-save', verifyToken, toggleSaveArticle);
router.get('/saved-articles', verifyToken, getSavedArticles);

module.exports = router;