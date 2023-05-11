const mongoose = require("mongoose");

const MealTypeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  content: { type: String, require: true },
  image: { type: String, require: true },
  meal_type: { type: Number, require: true },
});

const MealTypeModel = mongoose.model("mealtype", MealTypeSchema, "mealtypes");

module.exports = MealTypeModel;
