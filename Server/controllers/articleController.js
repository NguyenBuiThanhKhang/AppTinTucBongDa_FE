const Article = require('../models/Article');
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

        // B1: Tìm danh mục hiện tại
        const currentCategory = await Category.findOne({slug: slug});

        if (!currentCategory) {
            return res.status(404).json({
                success: false,
                message: `Không tìm thấy danh mục có slug là: ${slug}`
            });
        }

        // B2: Tìm danh mục con
        const subCategories = await Category.find({parent: currentCategory._id});

        // B3: Gom ID vào array
        const listIds = [
            currentCategory._id,
            ...subCategories.map(cat => cat._id)
        ];

        // B4: Query bài viết
        const articles = await Article.find({
            category: {$in: listIds}
        })
            .sort({original_published_at: -1})
            .skip(skip)
            .limit(limit)
            .populate('category', 'name slug');

        const total = await Article.countDocuments({category: {$in: listIds}});

        return res.status(200).json({
            success: true,
            data: {
                category: currentCategory,
                articles: articles,
                pagination: {
                    page,
                    limit,
                    total
                }
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
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết với ID này!'
            });
        }
        // type NewspaperDetailProps ={
        //     title: string,
        //     introduction: string,
        //     content: BlockNewspaper[],
        //     rate: RatingProps,
        //     listComment: CommentListProps
        // }
        const newspaper = {
            title: article.title,
            introduction: "",
            content: getContentFromDB(article.content),
            rate: {
                rate: 0,
            },
            listComment: {
                listCmt: [],
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
    getNewspaperDetails,
    getArticlesByCategory
};

