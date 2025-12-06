const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: String, required: true },
  duration: { type: Number, required: true },
  notes: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudySession", studySessionSchema);