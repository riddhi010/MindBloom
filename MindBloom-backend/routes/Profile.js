const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Multer setup with filename control
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// GET user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add image URL
    const userObj = user.toObject(); //convert Mongoose document to plain object
    userObj.profilePicture = user.profilePicture || 'default-profile.png';

    res.json(userObj);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update profile
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    console.log('Fields:', req.body);
    console.log('File:', req.file);

    const { name, email, bio } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedUser = {
      name,
      email,
      bio,
    };
    if (image) updatedUser.profilePicture = image;

    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
    });

    const userObj = user.toObject();
    userObj.profilePicture = user.profilePicture || 'default-profile.png'
    ? user.profilePicture.replace(/\\/g, '/')
    : 'default-profile.png';
     

    res.json(userObj);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE user account
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
