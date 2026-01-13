// routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

// Định nghĩa route GET /api/matches
router.get('/', matchController.getMatches);

module.exports = router;