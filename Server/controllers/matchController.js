const Match = require('../models/Match');

exports.getMatches = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const matches = await Match.find()
            .sort({ match_date: -1 })
            .limit(limit);

        res.status(200).json(matches);
    } catch (error) {
        console.error("Lỗi lấy danh sách trận đấu:", error);
        res.status(500).json({ message: "Lỗi Server", error: error.message });
    }
};