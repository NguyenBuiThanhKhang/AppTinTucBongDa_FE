const Rate = require("../models/Rate");
const Comment = require("../models/Comment");
const createRate = async (req, res) => {
    try {
        const { idArticle, author, rate } = req.body;
        const newRate = new Rate({
            idArticle: idArticle,
            author: author,
            rate: rate ,
        });
        await newRate.save();
        res.status(200).json({ message: 'Thành công', rate: newRate });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};

const getRateByArticleID = async (req, res) => {
    try {
        const articleId = req.params.id;
        const rate = await Rate.find({ idArticle: articleId }).sort({ createdAt: -1 });
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
}
module.exports = {
    createRate,
    getRateByArticleID
}