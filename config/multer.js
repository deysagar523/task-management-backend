// config/multer.js
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    // Extract file name without extension
    const fileNameWithoutExt = path.parse(file.originalname).name;
    // Generate a new file name with timestamp and original extension
    cb(
      null,
      `${fileNameWithoutExt}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Create upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size (10MB in this case)
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: PDFs Only!");
  }
}

module.exports = upload;
