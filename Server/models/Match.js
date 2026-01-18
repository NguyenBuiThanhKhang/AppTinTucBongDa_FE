const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    api_id: { type: Number, required: true, unique: true },
    competition: { type: String, required: true },
    season: { type: String },
    match_date: { type: Date, required: true },
    status: { type: String, required: true },
    home_team: {
        name: { type: String, required: true },
        logo: { type: String }
    },
    away_team: {
        name: { type: String, required: true },
        logo: { type: String }
    },
    score: {
        home: { type: Number, default: null },
        away: { type: Number, default: null }
    }
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);