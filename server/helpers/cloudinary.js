const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    secure: true,
  });

  // Force HTTPS URL before saving to MongoDB
  // const secureUrl = result.url.replace("http://", "https://");

  // return { ...result, url: secureUrl };

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
