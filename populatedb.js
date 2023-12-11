#! /usr/bin/env node

console.log(
  'script: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const Categories = [];
const Itemsarr = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createIt();
  await createCat();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function createCategories(index, name, description, items) {
  const details = {
    name: name,
    description: description,
    items: items,
  };

  const category = new Category(details);

  await category.save();
  Categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createItems(
  index,
  name,
  description,
  category,
  in_stock,
  price
) {
  const details = {
    name: name,
    description: description,
    category: category,
    in_stock: in_stock,
    price: price,
  };

  const item = new Item(details);

  await item.save();
  Itemsarr[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCat() {
  console.log("Adding Categories");
  await Promise.all([
    createCategories(
      0,
      "Cats",
      "This is category for cats, where You can find accessories for Cats",
      [Itemsarr[0], Itemsarr[1]]
    ),
    createCategories(
      1,
      "Dogs",
      "This is category for Dogs, where You can find accessories for Dogs",
      [Itemsarr[2], Itemsarr[3]]
    ),
    createCategories(
      2,
      "Birds",
      "This is category for Birds, where You can find accessories for Birds",
      [Itemsarr[4], Itemsarr[5]]
    ),
    createCategories(
      3,
      "Fish",
      "This is category for Fish, where You can find accessories for Fish",
      [Itemsarr[6], Itemsarr[7]]
    ),
  ]);
}

async function createIt() {
  console.log("Adding authors");
  await Promise.all([
    createItems(0, "Cat Food", "Delicious cat food", "Cats", 323, 15),
    createItems(1, "Cat toy", "Some good cat toy", "Cats", 3346, 3),
    createItems(2, "Dog Food", "Delicious dog food", "Dogs", 1313, 15),
    createItems(3, "Dog toy", "Some good dog toy", "Dogs", 23, 22),
    createItems(4, "Bird Food", "Delicious bird food", "Birds", 893, 15),
    createItems(5, "Bird toy", "Some good bird toy", "Birds", 13, 123),
    createItems(6, "Fish Food", "Delicious fish food", "Fish", 1533, 4),
    createItems(7, "Fish toy", "Some good fish toy", "Fish", 843, 3),
  ]);
}
