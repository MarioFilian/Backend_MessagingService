// models/Presence.js
const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: String,
  status: { type: String, default: 'online' },
  connectedAt: { type: Date, default: Date.now },
  disconnectedAt: Date,
});

module.exports = mongoose.model('Presence', presenceSchema);
