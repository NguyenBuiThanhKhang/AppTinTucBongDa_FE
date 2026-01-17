const express = require('express');
const router = express.Router();
const { savePrediction, getPrediction } = require('../controllers/predictionController');

router.post('/', savePrediction);

router.get('/:userId/:matchId', getPrediction);

module.exports = router;