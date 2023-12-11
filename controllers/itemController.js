const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.author_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ family_name: 1 }).exec();
  res.render("category_list", {
    title: "Categories",
  });
});
