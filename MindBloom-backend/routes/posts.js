const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");
const mongoose = require("mongoose");  

// Setup multer storage for image uploads
const storage = multer.diskStorage({ //multer is a middleware for handling multipart/form-data, which is used for uploading files
  destination: (req, file, cb) => {  //cb - callback function
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Route to get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to create a new post with image support
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { userId, username, content } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log("Received post data:", req.body);
    console.log("Uploaded file:", req.file);

    // Validate required fields
    if (!userId || !username || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Post({
      user: req.body.userId,   
      username,
      content: req.body.content,
      image,
    });
    

    const savedPost = await newPost.save();
    console.log("Post saved:", savedPost);
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});

// Route to get posts by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate("user", "username") // this fetches username from User model
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => ({
      ...post._doc,
      username: post.user.username, 
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }
});

// DELETE a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

// Static route to serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
