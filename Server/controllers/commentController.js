const createComment = async (req, res) => {
    try {
        const { articleId, userId, text } = req.body;
        const newComment = new Comment({
            idArticle: articleId,
            author: userId,
            content: text.trim()
        });
        await newComment.save();
        res.status(200).json({ message: 'Bình luận đã được tạo thành công', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};

module.exports = {
    createComment
};