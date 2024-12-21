const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema(
  {
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", FeatureSchema);
