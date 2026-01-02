const express = require('express');
const {createComment, getCommentsByArticleId} = require("../controllers/commentController");
const router = express.Router();

router.post('/', createComment);
router.get('/:id', getCommentsByArticleId);

module.exports = router;