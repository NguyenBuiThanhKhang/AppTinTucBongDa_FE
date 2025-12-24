const Article = require('../models/Article');

const getLatestArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .sort({createdAt: -1})
            .limit(10)
            .populate('category', 'name slug')
            .lean();

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message: 'Lỗi server', error: error.message});
    }
};

module.exports = {getLatestArticles};