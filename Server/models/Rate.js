const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    idArticle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rate', rateSchema);