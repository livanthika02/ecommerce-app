import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Seed route
router.post("/seed", async (req, res) => {
  try {
    const demoProducts = [
      { 
        name: "Ceramic Pour-Over Set", 
        description: "A hand-glazed ceramic dripper and matching mug", 
        price: 45, 
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
        category: "Home",
        stock: 10
      },
      { 
        name: "Canvas Weekender Bag", 
        description: "Waxed canvas duffel with leather straps", 
        price: 120, 
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        category: "Bags",
        stock: 5
      },
      { 
        name: "Wool Throw Blanket", 
        description: "Heavyweight wool throw woven in a soft herringbone", 
        price: 85, 
        imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
        category: "Home",
        stock: 8
      }
    ];

    await Product.deleteMany({});
    await Product.insertMany(demoProducts);
    res.json({ message: "Seeded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;