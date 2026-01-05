import FoodModel from "../models/foodModel.js";
import fs from "fs";

/////////////////////////////////////////////////////
// Add Food Item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "Image file is required" });
    }

    const image_filename = `${req.file.filename}`;

    const newFood = new FoodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await newFood.save();
    res.json({ success: true, message: "New Food Added" });
  } catch (err) {
    console.log("Error adding food:", err);
    res.json({ success: false, message: err.message || "Error adding food" });
  }
};

////////////////////////////////////////////////
// All Food List
const listFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

/////////////////////////////////////////////////
// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await FoodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFoods, removeFood };
