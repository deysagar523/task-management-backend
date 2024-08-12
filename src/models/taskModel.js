const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  estimatedTime: { type: Number, required: true },
  document: { type: String },
  additionalDetails: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
