const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dv8wobz6l",
  api_key: "297578588665596",
  api_secret: "p1olEfWegpnlyfH5V7AntjG1IaE",
  secure: true,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    secure: true,
  });

  // Force HTTPS URL before saving to MongoDB
  const secureUrl = result.url.replace("http://", "https://");

  console.log(result);

  return { ...result, url: secureUrl };
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
