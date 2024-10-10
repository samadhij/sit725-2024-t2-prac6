const express = require("express");
const router = express.Router();
const Cuisine = require("../models/cuisineModel");

// Get all cuisines
router.get("/cuisines", async (req, res) => {
  try {
    const cuisines = await Cuisine.getAllCuisines();
    res.json({
      statusCode: 200,
      data: cuisines,
      message: "get all cuisines successful",
    });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

// Post a new cuisine
router.post("/cuisine", async (req, res) => {
  try {
    const cuisine = req.body;
    if (!cuisine.title || !cuisine.title2) {
      return res.status(400).json({ error: "Titles are required" });
    } else if (!cuisine.path) {
      return res.status(400).json({ error: "Image is required" });
    } else if (!cuisine.subTitle) {
      return res.status(400).json({ error: "Dish ingredients are required" });
    }
    const result = await Cuisine.postCuisine(cuisine);
    res.json({ statusCode: 201, data: result, message: "success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

module.exports = router;
