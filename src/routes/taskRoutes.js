const express = require("express");
const router = express.Router();
const upload = require("../../config/multer"); // Import Multer configuration
const taskController = require("../controllers/taskController");

// Create a task with file upload
router.post("/", upload.single("document"), taskController.createTask);

// Update a task with file upload
router.put("/:id", upload.single("document"), taskController.updateTask);

// Get all tasks
router.get("/", taskController.getTasks);

// Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
