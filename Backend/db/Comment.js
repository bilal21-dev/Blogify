const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
        required: true,
        index: true // Index for faster queries
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000 // Reasonable limit for comments
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index for efficient queries by blog
commentSchema.index({ blogId: 1, createdAt: -1 });

module.exports = mongoose.model("comments", commentSchema);
