const Feature = require("../../models/Feature");
const cloudinary = require("cloudinary").v2;

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const featureImage = await Feature.findByIdAndDelete(id);
    if (!featureImage) {
      return res
        .status(404)
        .json({ success: false, message: "Featured image not found" });
    }
    const imageUrl = featureImage.image;
    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image URL is missing" });
    }
    // console.log("Image URL to delete:", imageUrl);

    // Extracting public_id from the image URL
    // Where Cloudinary URL is https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // console.log("Public ID:", publicId);
    
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      return res.status(500).json({
        success: false,
        message: "Error occurred while deleting image from Cloudinary",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Feature image deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };
