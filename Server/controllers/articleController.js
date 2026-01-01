const Article = require('../models/Article');
const Category = require('../models/Category');
const { getContentFromDB } = require("../utils/suport");

// 1. Lấy bài viết mới nhất 
const getLatestArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .sort({ original_published_at: -1, createdAt: -1 }) 
            .limit(10)
            .populate('category', 'name slug')
            .lean();

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// 2. Lấy bài viết theo danh mục 
const getArticlesByCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 13;
        const skip = (page - 1) * limit;

        // B1: Tìm danh mục hiện tại
        const currentCategory = await Category.findOne({ slug: slug });

        if (!currentCategory) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy danh mục có slug là: ${slug}`
            });
        }

        // B2: Tìm danh mục con 
        const subCategories = await Category.find({ parent: currentCategory._id });

        // B3: Gom ID của mục cha và các mục con vào array
        const listIds = [
            currentCategory._id,
            ...subCategories.map(cat => cat._id)
        ];

        // B4: Query bài viết và Đếm tổng số
        const [articles, total] = await Promise.all([
            Article.find({ category: { $in: listIds } })
                .sort({ original_published_at: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category', 'name slug')
                .lean(), 
            
            Article.countDocuments({ category: { $in: listIds } })
        ]);

        // B5: Tính tổng số trang
        const totalPages = Math.ceil(total / limit);

        return res.status(200).json({
            success: true,
            data: {
                category: currentCategory,
                articles: articles,
            },
            pagination: {
                page,
                limit,
                total,
                totalPages 
            }
        });

    } catch (error) {
        console.error("Lỗi Server:", error);
        return res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 3. Xem chi tiết bài viết
const getNewspaperDetails = async (req, res) => {
    try {
        const { slug } = req.params; 

        const article = await Article.findOne({ slug: slug });
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết!'
            });
        }

        const newspaper = {
            _id: article._id, 
            title: article.title,
            slug: article.slug,
            thumbnail: article.thumbnail,
            author: article.author,
            original_published_at: article.original_published_at,
            introduction: article.sapo || "", 
            content: getContentFromDB(article.content),
            rate: {
                rate: 5,
            },
            listComment: {
                listCmt: [],
            }
        };

        res.status(200).json({
            success: true,
            data: newspaper
        });

    } catch (error) {
        console.error("Lỗi chi tiết bài viết:", error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
}

module.exports = {
    getLatestArticles,
    getNewspaperDetails,
    getArticlesByCategory
};