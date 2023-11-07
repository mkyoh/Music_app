const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please insert title'],
  },
  artist: {
    type: String,
    required: [true, 'Please insert artist'],
  },
  album: {
    type: String,
    required: [true, 'Please insert album'],
  },
  genre: {
    type: String,
    required: [true, 'Please insert genre'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Song', songSchema);