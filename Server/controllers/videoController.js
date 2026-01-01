const Video = require('../models/Video');
const Category = require('../models/Category');

const getVideos = async (req, res) => {
    try {
        const { category } = req.query; 
        
        let filter = {};
        
        if (category && category !== 'all') {
            filter.category = category; 
        }

        const videos = await Video.find(filter).sort({ createdAt: -1 }).limit(20);
        
        res.status(200).json({
            success: true,
            data: videos
        });
    } catch (error) {
        console.error("Lỗi lấy video:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

const getVideosGroupedByCategory = async (req, res) => {
    try {
        const categories = await Category.find().sort({ order: 1 });
        const result = [];

        await Promise.all(categories.map(async (cat) => {
            const videos = await Video.find({ category: cat.slug })
                                      .sort({ createdAt: -1 })
                                      .limit(4); 
            
            if (videos.length > 0) {
                result.push({
                    _id: cat._id,
                    name: cat.name,
                    slug: cat.slug,
                    videos: videos
                });
            }
        }));

        const finalResult = [];
        categories.forEach(cat => {
            const found = result.find(r => r.slug === cat.slug);
            if (found) finalResult.push(found);
        });

        res.status(200).json({ success: true, data: finalResult });

    } catch (error) {
        console.error("Lỗi lấy group video:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

module.exports = { getVideos, getVideosGroupedByCategory };