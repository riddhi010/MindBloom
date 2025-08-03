const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  emoji: String,
  label: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId, //defines this field as an ObjectId, which is the primary type MongoDB uses for IDs.
    ref: 'User',
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Mood', MoodSchema);
