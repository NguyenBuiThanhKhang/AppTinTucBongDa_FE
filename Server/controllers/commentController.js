const Comment = require('../models/Comment');
const createComment = async (req, res) => {
    try {
        const { idArticle, author, content } = req.body;
        const newComment = new Comment({
            idArticle: idArticle,
            author: author,
            content: content.trim(),
            type: 1
        });
        await newComment.save();
        res.status(200).json({ message: 'Thành công', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};
module.exports = {
    createComment
};