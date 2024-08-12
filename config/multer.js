const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "image", // Specify resource type as 'image'
    allowed_formats: ["png", "jpg", "jpeg"], // Allowed image formats
    public_id: (req, file) =>
      file.originalname.split(".")[0] + "-" + Date.now(), // Unique public ID
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
