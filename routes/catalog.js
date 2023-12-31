var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get("/", category_controller.index);

//categories routes

router.get("/categories/create", category_controller.category_create_get);

router.post("/categories/create", category_controller.category_create_post);

router.get("/categories/:id/delete", category_controller.category_delete_get);

router.post("/categories/:id/delete", category_controller.category_delete_post);

router.get("/categories/:id/update", category_controller.category_update_get);

router.post("/categories/:id/update", category_controller.category_update_post);

router.get("/categories", category_controller.category_list);

router.get("/categories/:id", category_controller.category_detail);

// items croutes

router.get("/items/create", item_controller.item_create_get);

router.post("/items/create", item_controller.item_create_post);

router.get("/items/:id/delete", item_controller.item_delete_get);

router.post("/items/:id/delete", item_controller.item_delete_post);

router.get("/items/:id/update", item_controller.item_update_get);

router.post("/items/:id/update", item_controller.item_update_post);

router.get("/items", item_controller.item_list);

router.get("/items/:id", item_controller.item_detail);

module.exports = router;
