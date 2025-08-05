const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, enum: ['anonymous', 'AI'], default: 'anonymous' },
  createdAt: { type: Date, default: Date.now }
});

const AnonPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  
  
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnonPost', AnonPostSchema);
