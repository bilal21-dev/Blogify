const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sharedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs", // Assuming you have a "Post" collection
    },
  ],
  status: {
    type: String, // This will be the bio or caption text
    default: '',   // Default value can be an empty string
  },
  profilePic: { type: String, default: '' }
})
module.exports = mongoose.model("users", userSchema);