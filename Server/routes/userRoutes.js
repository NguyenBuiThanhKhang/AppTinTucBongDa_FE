const express = require('express');
const {login, register, toggleSaveArticle} = require("../controllers/userController");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/registers', register);
router.post('/toggle-save', verifyToken, toggleSaveArticle);

module.exports = router;