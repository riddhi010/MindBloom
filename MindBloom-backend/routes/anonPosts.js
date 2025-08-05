const express = require('express');
const AnonPost = require('../models/AnonPost.js');

const { getAIReply } = require("../controllers/aiController");

const router = express.Router();

// Create post with sentiment analysis
router.post("/", async (req, res) => {
  try {
    const { text, lang } = req.body;

    const aiReply = await getAIReply(text, lang || "en");

    const newPost = new AnonPost({
      text,
      sentiment: "analyzed", // You can enhance this later
      comments: [
        {
          text: aiReply,
          author: "AI",
        },
      ],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await AnonPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment
router.post('/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const post = await AnonPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ text, author: 'anonymous' });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error("❌ Error adding comment:", err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
