const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },          // Blog title
    description: { type: String, required: true },   // Brief description of the blog
    content: { type: String, required: true },       // Detailed blog content
    image: { type: String, default: null },         // Image URL or file path
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    commentCount: { type: Number, default: 0 }       // Cache comment count for performance
});

module.exports = mongoose.model("blogs", blogSchema);
