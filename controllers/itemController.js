const item = require("../models/item");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
});
exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("Not implemented yet");
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
