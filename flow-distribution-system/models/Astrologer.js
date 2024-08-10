const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flow: { type: Number, default: 1 }, // Represents how often this astrologer should be selected
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
