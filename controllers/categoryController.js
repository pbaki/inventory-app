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

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});
