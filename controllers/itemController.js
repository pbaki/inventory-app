const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
  const Allitems = await Item.find().sort({ name: 1 });

  res.render("item_list", {
    title: "All Products",
    items: Allitems,
  });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category");
  const category = await Category.find({ name: item.category });

  res.render("item_details", {
    title: "Product details",
    item: item,
    category: category[0],
  });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.render("item_form", {
    title: "Create Product",
    categories: categories,
  });
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  [
    body("name", "name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("description", "description name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("price").escape(),
    body("instock").escape(),
  ];
  const errors = validationResult(req);
  const categories = await Category.find();

  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    in_stock: req.body.instock,
    price: req.body.price,
  });

  if (!errors.isEmpty()) {
    res.render("item_form", {
      title: "Create Product",
      categories: categories,
    });
    return;
  } else {
    const itemExists = await Item.findOne({
      name: req.body.name,
      description: req.body.description,
    });
    if (itemExists) {
      res.redirect(itemExists.url);
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();

  if (item === null) {
    res.redirect("/catalog/items");
  }

  res.render("item_delete", {
    title: "Delete Product",
    item: item,
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.body.itemid);

  await Item.findByIdAndDelete(item.id);
  res.redirect("/catalog/items");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, category] = await Promise.all([
    await Item.findById(req.params.id),
    await Category.find(),
  ]);

  res.render("item_form", {
    title: "Update Product",
    item: item,
    categories: category,
  });
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  [
    body("name", "name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("description", "description name must contain at least 2 characters")
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body("price").escape(),
    body("instock").escape(),
    body("category").escape(),
  ];
  const errors = validationResult(req);

  const [item, category] = await Promise.all([
    await Item.findById(req.params.id),
    await Category.find(),
  ]);

  const newitem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    in_stock: req.body.instock,
    category: req.body.category,
    _id: item.id,
  });

  if (!errors.isEmpty()) {
    res.render("item_form", {
      title: "Update Product",
      item: item,
      categories: category,
    });
    return;
  } else {
    if (item.name.length > 0) {
      await Item.findByIdAndUpdate(item.id, newitem);
      res.redirect(newitem.url);
    } else {
      res.redirect("/catalog/items");
    }
  }
});
