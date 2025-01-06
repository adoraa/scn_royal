const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const cloudinary = require("cloudinary").v2;

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result: {
        // Image URL from Cloudinary
        url: result.secure_url,
        // Cloudinary public_id for deletion
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const uploadedImage = await imageUploadUtil(image);

    const newlyCreatedProduct = new Product({
      image: uploadedImage.secure_url, // Store the Cloudinary image URL
      imagePublicId: uploadedImage.public_id, // Store the public_id for future deletions
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({}).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Only upload a new image if a new one is provided
    let updatedImage = findProduct.image;
    let updatedPublicId = findProduct.imagePublicId;

    if (image && image !== findProduct.image) {
      // A new image was uploaded,
      // so delete the old one from cloudinary
      if (findProduct.imagePublicId) {
        await cloudinary.uploader.destroy(findProduct.imagePublicId);
      }

      //upload the new image
      const result = await cloudinary.uploader.upload(image, {
        // Adjust folder as necessary
        folder: "products",
      });
      // Set the new image URL
      updatedImage = result.secure_url;
      updatedPublicId = result.public_id;
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = updatedImage;
    findProduct.imagePublicId = updatedPublicId;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Extract the public ID from the image URL
    const imageUrl = product.image;
    // Get the public ID without the file extension
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        // console.log("Cloudinary image deletion error:", error);
        return res.status(500).json({
          success: false,
          message: "Error occurred while deleting image",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
