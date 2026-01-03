const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Rate = require('../models/Rate');
const {getContentFromDB} = require("../utils/suport");

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

const getNewspaperDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);
        const comments = await Comment.find({ idArticle: id }).sort({ createdAt: -1 });
        const rate = await Rate.find({ idArticle: id}).sort({ createdAt: -1 });
        let totalRate = 0;
        rate.forEach(r => {
            totalRate+= parseFloat(r.rate);
        });
        totalRate = rate.length === 0 ? 0 : totalRate / rate.length;
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết với ID này!'
            });
        }
        const newspaper={
            title: article.title,
            introduction: "",
            content: getContentFromDB(article.content),
            rate: {
                rate: totalRate,
            },
            listComment: {
                listCmt:comments,
            }
        }
        res.status(200).json({
            success: true,
            data: newspaper
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server hoặc định dạng ID không đúng',
            error: error.message
        });
    }
}

module.exports = {
    getLatestArticles,
    getNewspaperDetails
};

