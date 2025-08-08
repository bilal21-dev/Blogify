const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const Blog = require('./db/Blog');
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require('bcrypt');

// Set up multer storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique file name
    },
});

// Initialize multer
const upload = multer({ storage });

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Signup Route

// app.post("/signup", async (req, res) => {
//     if (req.body.password && req.body.email && req.body.name) {
//         let user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         delete result.password;
//         res.send(result);
//     } else {
//         res.send({ result: "Enter Complete information" });
//     }
// });
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

// Login Route
// app.post("/login", async (req, res) => {
//     if (req.body.password && req.body.email) {
//         let user = await User.findOne(req.body).select("-password");
//         if (user) {
//             res.send(user);
//         } else {
//             res.send({ result: "No record" });
//         }
//     } else {
//         res.send({ result: "Enter Complete details" });
//     }
// });

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

// Home Route with Image Upload
app.post("/home", upload.single("image"), async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        // const image = req.file ? req.file.path : null; // Save image path
        const image = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : null;

        const blog = new Blog({ title, description, content, image, author });
        const savedBlog = await blog.save();

        res.send(savedBlog);
    } catch (err) {
        console.error(err);
        res.send({ error: "Failed to save blog" });
    }
});

app.get("/home", async (req, res) => {
    let blogs = await Blog.find().populate('author', 'name email')
    if (blogs.length > 0) {
        res.send(blogs)
    }
    else {
        res.send("no result");
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

app.post('/upload-profile-pic/:userId', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const filePath = req.file.path;

        // Update user profile picture in the database
        const user = await User.findByIdAndUpdate(userId, { profilePic: filePath }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile picture updated', filePath });
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


// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
