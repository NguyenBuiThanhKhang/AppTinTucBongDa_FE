const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Rate = require('../models/Rate');
const Category = require('../models/Category');
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

const getArticlesByCategory = async (req, res) => {
    try {
        const {slug} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 13;
        const skip = (page - 1) * limit;

        const currentCategory = await Category.findOne({slug: slug});

        if (!currentCategory) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy danh mục có slug là: ${slug}`
            });
        }

        const subCategories = await Category.find({parent: currentCategory._id});

        const listIds = [
            currentCategory._id,
            ...subCategories.map(cat => cat._id)
        ];

        const articles = await Article.find({
            category: {$in: listIds}
        })
            .sort({original_published_at: -1})
            .skip(skip)
            .limit(limit)
            .populate('category', 'name slug');

        const total = await Article.countDocuments({category: {$in: listIds}});
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
        return res.status(500).json({success: false, message: "Lỗi server"});
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
            _id: article._id,
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
const getNewspaperDetailsInter = async (id) => {
    const article = await Article.findById(id);
    if (!article) {
        throw new Error("Không tìm thấy bài viết");
    }

    const comments = await Comment.find({ idArticle: id }).sort({ createdAt: -1 });
    const rate = await Rate.find({ idArticle: id }).sort({ createdAt: -1 });

    let totalRate = 0;
    rate.forEach(r => totalRate += parseFloat(r.rate));
    totalRate = rate.length === 0 ? 0 : totalRate / rate.length;

    return {
        _id: article._id,
        title: article.title,
        introduction: "",
        content: getContentFromDB(article.content),
        rate: {
            rate: totalRate,
        },
        listComment: {
            listCmt: comments,
        }
    };
};


const searchArticles = async (req, res) => {
    try {
        const { keyword } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        if (!keyword) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập từ khóa" });
        }

        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { sapo: { $regex: keyword, $options: 'i' } }
            ]
        };

        const [articles, total] = await Promise.all([
            Article.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)   
                .limit(limit) 
                .populate('category', 'name slug'), 
            Article.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: articles,
            pagination: {
                page,
                limit,
                total,
                totalPages
            }
        });

    } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

const getSpecialArticles = async (req, res) => {
    try {
        const articles = await Article.aggregate([
            { $sample: { size: 8 } } 
        ]);

        await Article.populate(articles, { path: 'category', select: 'name slug' });

        const formattedArticles = articles.map(art => ({
            _id: art._id,
            title: art.title,
            slug: art.slug,
            thumbnail: art.thumbnail,
            tag: Math.random() > 0.5 ? "BIG STORY" : "HOT NEWS" 
        }));

        res.status(200).json({
            success: true,
            data: formattedArticles
        });

    } catch (error) {
        console.error("Lỗi lấy bài đặc biệt:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

module.exports = {
    getLatestArticles,
    getNewspaperDetails,
    getArticlesByCategory, 
    getSpecialArticles,
    searchArticles,
    getNewspaperDetailsInter
};