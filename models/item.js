const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  category: {
    type: String,
    required: true,
    enum: ["Cats", "Dogs", "Birds", "Fish"],
    default: "Cats",
  },
  in_stock: { type: Number, required: true },
  price: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
