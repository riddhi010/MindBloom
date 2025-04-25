const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const baseUsername = name.toLowerCase().replace(/\s+/g, '');
let username = baseUsername;
let count = 1;

// Ensure the username is unique
while (await User.findOne({ username })) {
  username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
}

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered!' });

    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters and contain letters and numbers'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      streak: 1,
      lastLogin: new Date()
    });
    
    await newUser.save();

    const defaultPost = new Post({
      user: newUser._id, 
      username: newUser.username,
      content: "Welcome to the platform!",
      image: "https://example.com/welcome.jpg"
    });
    await defaultPost.save();
    

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Login Route 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please enter all fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password!' });

    // ---------- STREAK LOGIC ----------
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let updatedStreak = 1; // default streak

    if (user.lastLogin) {
      const lastLogin = new Date(user.lastLogin);
      lastLogin.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        updatedStreak = (user.streak || 1) + 1; 
      } else if (diffDays > 1) {
        updatedStreak = 1; 
      } else {
        updatedStreak = user.streak || 1; 
      }
    }

    // Save updates
    user.streak = updatedStreak;
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        streak: user.streak,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;
