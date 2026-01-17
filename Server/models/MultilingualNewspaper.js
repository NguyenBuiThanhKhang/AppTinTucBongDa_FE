const mongoose = require('mongoose');

const multilingualNewspaperSchema = new mongoose.Schema({
    idArticle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    countryCode: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('multilingualNewspaper', multilingualNewspaperSchema);