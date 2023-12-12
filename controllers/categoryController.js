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
  const Allcategories = await Category.find().sort({ name: 1 });

  res.render("category_list", {
    title: "All Categories",
    categories: Allcategories,
  });
});
exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("items");

  res.render("category_details", {
    title: "Category details",
    category: category,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("items");
  console.log(category);
  if (category === null) {
    res.redirect("/catalog/categories");
  }

  res.render("category_delete", {
    title: "Delete category",
    category: category,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, items] = await Promise.all([
    await Category.findById(req.body.categoryid),
    await Item.find({ category: req.body.categoryid }),
  ]);

  if (items.length > 0) {
    res.render("category_delete", {
      title: "Delete category",
      category: category,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid),
      res.redirect("/catalog/categories");
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});
