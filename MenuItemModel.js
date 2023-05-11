const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const MenuItemSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: ObjectId },
  image: { type: String, require: true },
  qty: { type: Number, require: true },
  price: { type: Number },
});

const MenuItemModel = mongoose.model("menuitem", MenuItemSchema, "menuitems");

module.exports = MenuItemModel;
