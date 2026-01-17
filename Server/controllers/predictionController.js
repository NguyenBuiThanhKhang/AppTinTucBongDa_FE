const Prediction = require('../models/Prediction');

const savePrediction = async (req, res) => {
    try {
        const { userId, matchId, prediction } = req.body;

        if (!userId || !matchId || !prediction) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }

        const predictionData = {
            user: userId,
            matchId: Number(matchId),
            homeScore: prediction.homeScore,
            awayScore: prediction.awayScore,
            formation: prediction.formation,
            lineup: prediction.lineup
        };

        const updatedPrediction = await Prediction.findOneAndUpdate(
            { user: userId, matchId: matchId },
            predictionData,
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: 'Lưu dự đoán thành công',
            data: updatedPrediction
        });

    } catch (error) {
        console.error("Lỗi savePrediction:", error);
        res.status(500).json({ message: 'Lỗi server khi lưu dự đoán' });
    }
};

const getPrediction = async (req, res) => {
    try {
        const { userId, matchId } = req.params;

        const prediction = await Prediction.findOne({
            user: userId,
            matchId: Number(matchId)
        });

        if (!prediction) {
            return res.status(404).json({ message: 'Chưa có dự đoán' });
        }

        res.status(200).json(prediction);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = { savePrediction, getPrediction };