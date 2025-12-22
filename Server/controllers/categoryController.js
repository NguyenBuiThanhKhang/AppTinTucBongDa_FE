const Category = require('../models/Category');

// @desc    Lấy tất cả danh mục
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi Server', error: error.message });
    }
};

module.exports = {
    getAllCategories
};