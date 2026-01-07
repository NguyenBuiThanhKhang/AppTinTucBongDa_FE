const express = require('express');
const {createRate} = require("../controllers/rateController");
const {getCommentsByArticleId} = require("../controllers/commentController");
const router = express.Router();

router.post('/', createRate);
router.get('/:id', getCommentsByArticleId);

module.exports = router;