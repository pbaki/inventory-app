const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Categories.
exports.index = asyncHandler(async (req, res, next) => {
  const categoryQuantity = await Category.countDocuments();
  const itemQuantity = await Item.countDocuments();

  res.render("index", {
    title: "Contents",
    categories_quantity: categoryQuantity,
    items_quantity: itemQuantity,
  });
});
