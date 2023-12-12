const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
  const Allitems = await Item.find().sort({ name: 1 });

  res.render("item_list", {
    title: "All Items",
    items: Allitems,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category");
  const category = await Category.find({ name: item.category });
  res.render("item_details", {
    title: "Item details",
    item: item,
    category: category[0],
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});
