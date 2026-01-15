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
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('multilingualNewspaper', multilingualNewspaperSchema);