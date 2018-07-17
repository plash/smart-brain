const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  processedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Image = mongoose.model("image", ImageSchema);
