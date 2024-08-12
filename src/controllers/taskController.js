const Task = require("../models/taskModel");

// Create a task
exports.createTask = async (req, res) => {
  try {
    const {
      taskName,
      isCompleted,
      estimatedTime,
      additionalDetails,
    } = req.body;

    const newTask = new Task({
      taskName,
      isCompleted: isCompleted ? isCompleted : false,
      estimatedTime,
      document: req.file ? req.file.path : "", // Use the file path from Multer
      additionalDetails,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      document: req.file ? req.file.path : req.body.document // Update document if a new file is uploaded
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
