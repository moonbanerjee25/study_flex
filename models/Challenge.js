const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  targetHours: Number,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  progress: [{ user: String, hours: Number }]
});

module.exports = mongoose.model("Challenge", challengeSchema);