const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    matchId: {
        type: Number,
        required: true
    },
    homeScore: { type: Number, required: true },
    awayScore: { type: Number, required: true },

    formation: { type: String, required: true },
    lineup: [
        {
            slotId: { type: String, required: true },
            playerId: { type: String, required: true }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

predictionSchema.index({ user: 1, matchId: 1 }, { unique: true });

module.exports = mongoose.model('Prediction', predictionSchema);