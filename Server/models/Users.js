const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    savedArticles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article' 
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', usersSchema);