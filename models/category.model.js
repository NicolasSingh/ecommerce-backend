const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlenght: 3,
    maxlenght: 50,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlenght: 255,
  },
});

module.exports = mongoose.model("Category", categorySchema);
