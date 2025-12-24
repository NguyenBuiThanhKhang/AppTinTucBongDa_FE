const Category = require('../models/Category');

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