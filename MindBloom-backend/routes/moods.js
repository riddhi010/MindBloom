const express = require('express');
const Mood = require('../models/Mood');
const router = express.Router();

// Save a mood
router.post('/', async (req, res) => {
  try {
    const { emoji, label, userId } = req.body;

    if (!emoji || !label || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newMood = new Mood({ emoji, label, userId, time: new Date() });
    await newMood.save();

    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ message: 'Error saving mood', error: err.message });
  }
});

// DELETE mood by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMood = await Mood.findByIdAndDelete(req.params.id);
    if (!deletedMood) return res.status(404).send("Mood not found");
    res.status(200).json({ message: "Mood deleted", deletedMood });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mood" });
  }
});

// Fetch moods by user
router.get('/:userId', async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching moods', error: err.message });
  }
});

module.exports = router;
