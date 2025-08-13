const express = require('express');
const cors = require("cors");
require('dotenv').config();
require('./db/config');
const User = require('./db/User');
const Blog = require('./db/Blog');
const Comment = require('./db/Comment');
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog-app', // Folder name in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif', 'webp'], // Supported file formats
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // Optional: resize images
    },
});

// Configure Cloudinary storage for profile pictures
const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog-app/profiles', // Folder for profile pictures
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'fill', gravity: 'face' }], // Square profile pics
    },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });
const profileUpload = multer({ storage: profileStorage });

// Signup Route


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ result: "Enter complete information" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ result: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const result = await user.save();

        // Remove password from response
        const responseUser = result.toObject();
        delete responseUser.password;

        res.send(responseUser);
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ result: "Internal server error" });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ result: "Enter complete details" });
    }

    try {
        // Find user by email and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).send({ result: "No record" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ result: "Invalid credentials" });
        }

        // Remove password from response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.send(userWithoutPassword);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ result: "Internal server error" });
    }
});

app.get("/update/:id", async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    res.send(user)
}
)
app.put("/update/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

// Home Route with Image Upload to Cloudinary
app.post("/home", upload.single("image"), async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        // Get Cloudinary URL instead of local path
        const image = req.file ? req.file.path : null; // Cloudinary URL

        const blog = new Blog({ title, description, content, image, author });
        const savedBlog = await blog.save();

        res.send(savedBlog);
    } catch (err) {
        console.error(err);
        res.send({ error: "Failed to save blog" });
    }
});

app.get("/home", async (req, res) => {
    try {
        let blogs = await Blog.find().populate('author', 'name email');
        if (blogs.length > 0) {
            // Add comment count to each blog for frontend display
            const blogsWithCommentCount = await Promise.all(
                blogs.map(async (blog) => {
                    const commentCount = await Comment.countDocuments({ blogId: blog._id });
                    return {
                        ...blog.toObject(),
                        commentCount
                    };
                })
            );
            res.send(blogsWithCommentCount);
        } else {
            res.send("no result");
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send({ error: "Failed to fetch blogs" });
    }
})

app.get('/profile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate({
            path: 'sharedPosts',
            populate: {
                path: 'author',
                select: 'name email'
            }
        }); // Populate shared posts with author info
        if (!user) return res.status(404).json({ error: "User not found" });

        const myBlogs = await Blog.find({ author: id }).populate('author', 'name email'); // Fetch user's own blogs with author info
        res.status(200).json({ myBlogs, sharedPosts: user.sharedPosts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/profile/:userId/share', async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        // Find the user and update shared posts
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.sharedPosts.includes(postId)) {
            user.sharedPosts.push(postId);
            await user.save();
        }

        res.status(200).json({ message: "Post shared successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { userId } = req.body; // Assuming `userId` is sent in the request body
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if the blog exists in the `blogs` collection
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the blog is owned by the user
        if (blog.author.toString() === userId) {
            // User owns the blog; delete it from the `blogs` collection
            await Blog.deleteOne({ _id: req.params.id });
            return res.json({ message: 'Blog deleted successfully' });
        }

        // If not owned, check if it's shared with the user
        const user = await User.findById(userId);
        if (user && user.sharedPosts.includes(req.params.id)) {
            // Remove the blog ID from the user's `sharedPosts` array
            user.sharedPosts = user.sharedPosts.filter(
                (postId) => postId.toString() !== req.params.id
            );
            await user.save();
            return res.json({ message: 'Shared blog removed successfully' });
        }

        // If neither owned nor shared, return unauthorized
        return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the blog' });
    }
});


app.post('/like/:postId', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const blog = await Blog.findById(postId).populate('author', 'name email');

        if (!blog) return res.status(404).send({ message: "Blog not found" });

        // Toggle like/unlike
        const isLiked = blog.likes.includes(userId);

        if (isLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();

        res.send({ likes: blog.likes.length, isLiked: !isLiked });
    } catch (err) {
        res.status(500).send({ message: "Failed to like/unlike the post", error: err.message });
    }
});


app.post('/status', async (req, res) => {
    const { userId, bio } = req.body;
    if (!userId || !bio) {
        return res.status(400).json({ message: 'User ID and bio are requiredddd' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = bio;
        await user.save();

        res.status(200).json({ message: 'Bio updated successfully', bio: user.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get('/status/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ bio: user.status || "No bio set yet" });
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/upload-profile-pic/:userId', profileUpload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const cloudinaryUrl = req.file ? req.file.path : null; // Cloudinary URL

        if (!cloudinaryUrl) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Update user profile picture in the database with Cloudinary URL
        const user = await User.findByIdAndUpdate(
            userId, 
            { profilePic: cloudinaryUrl }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ 
            message: 'Profile picture updated', 
            profilePicUrl: cloudinaryUrl,
            cloudinaryPublicId: req.file.filename // Store public_id for potential deletion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/profile-pic/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user: {
                profilePic: user.profilePic && user.profilePic.trim() !== '' ? user.profilePic : null, // Only return profilePic if it exists and is not empty
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.put('/password/:id', async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 6) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Incorrect current password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.send({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});


// ===== COMMENT ENDPOINTS =====

// Add a new comment to a blog
app.post("/api/comments", async (req, res) => {
    try {
        const { blogId, userId, content } = req.body;

        // Validate input
        if (!blogId || !userId || !content) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (content.trim().length === 0) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        if (content.length > 1000) {
            return res.status(400).json({ error: "Comment is too long (max 1000 characters)" });
        }

        // Check if blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create the comment
        const comment = new Comment({
            blogId,
            userId,
            content: content.trim()
        });

        const savedComment = await comment.save();

        // Update the blog's comment count
        await Blog.findByIdAndUpdate(blogId, {
            $inc: { commentCount: 1 }
        });

        // Populate user info for the response
        const populatedComment = await Comment.findById(savedComment._id)
            .populate('userId', 'name email profilePic');

        res.status(201).json({
            success: true,
            comment: populatedComment,
            message: "Comment added successfully"
        });

    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all comments for a specific blog
app.get("/api/comments/:blogId", async (req, res) => {
    try {
        const { blogId } = req.params;
        const { page = 1, limit = 20 } = req.query;

        // Validate blog ID
        if (!blogId) {
            return res.status(400).json({ error: "Blog ID is required" });
        }

        // Check if blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get comments with user info, sorted by newest first
        const comments = await Comment.find({ blogId })
            .populate('userId', 'name email profilePic')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const totalComments = await Comment.countDocuments({ blogId });

        res.json({
            success: true,
            comments,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalComments / limit),
                totalComments,
                hasMore: totalComments > skip + comments.length
            }
        });

    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a comment (only by comment owner or admin)
app.delete("/api/comments/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Find the comment
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Check if user is the comment owner
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only delete your own comments" });
        }

        // Delete the comment
        await Comment.findByIdAndDelete(id);

        // Update the blog's comment count
        await Blog.findByIdAndUpdate(comment.blogId, {
            $inc: { commentCount: -1 }
        });

        res.json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ===== END COMMENT ENDPOINTS =====

// Utility function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Cloudinary deletion result:', result);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};

// Optional: Add an endpoint to delete images (for cleanup)
app.delete('/delete-image/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const result = await deleteFromCloudinary(publicId);
        res.json({ message: 'Image deleted successfully', result });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});

// Start server
// const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
