const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sapo: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    author: {type: String, default: 'Bongdaplus'},
    original_published_at: {type: Date},

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    source_url: {
        type: String,
        unique: true,
        sparse: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Article', articleSchema);