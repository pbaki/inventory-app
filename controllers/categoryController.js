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

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("items");

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

exports.category_create_get = asyncHandler(async (req, res, next) => {
  const items = await Item.find().sort({ name: 1 });

  res.render("category_form", {
    title: "Create category",
    items: items,
  });
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  [
    body("name", "name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("description", "description name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
  ];
  const errors = validationResult(req);

  const items = await Item.find().sort({ name: 1 });
  const itemsToAdd = [];

  for (let item in req.body) {
    const found = await Item.find({ name: item });
    if (found.length > 0) {
      Array.prototype.push.apply(itemsToAdd, found);
    }
  }

  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    items: itemsToAdd,
  });

  if (!errors.isEmpty()) {
    res.render("category_form", {
      title: "Create category",
      items: items,
    });
    return;
  } else {
    const categoryExists = await Category.findOne({ name: req.body.name });
    if (categoryExists) {
      res.redirect(categoryExists.url);
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const items = await Item.find().sort({ name: 1 });
  const category = await Category.findById(req.params.id).populate("items");

  res.render("category_form", {
    title: "Update category",
    items: items,
    category: category,
  });
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  [
    body("name", "name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("description", "description name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
  ];
  const errors = validationResult(req);

  const [items, cat] = await Promise.all([
    await Item.find().sort({ name: 1 }),
    await Category.findById(req.params.id),
  ]);

  const itemsToAdd = [];

  for (let item in req.body) {
    const found = await Item.find({ name: item });
    if (found.length > 0) {
      Array.prototype.push.apply(itemsToAdd, found);
    }
  }
  console.log(cat.name.length);

  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    items: itemsToAdd,
    _id: cat.id,
  });

  if (!errors.isEmpty()) {
    res.render("category_form", {
      title: "Create category",
      items: items,
    });
    return;
  } else {
    if (cat.name.length > 0) {
      await Category.findByIdAndUpdate(cat.id, category);
      res.redirect(category.url);
    } else {
      res.redirect("/catalog/categories");
    }
  }
});
