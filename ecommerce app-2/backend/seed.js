// Seeds demo accounts and sample products so the app is usable right away.
// Run with: npm run seed  (from the backend/ folder, after starting MongoDB)
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";

dotenv.config();

const demoProducts = [
  { name: "Ceramic Pour-Over Set", description: "A hand-glazed ceramic dripper and matching mug, made for slow mornings.", price: 1499, category: "Kitchen", stock: 14 },
  { name: "Canvas Weekender Bag", description: "Waxed canvas duffel with leather straps, built to age well.", price: 3999, category: "Bags", stock: 7 },
  { name: "Wool Throw Blanket", description: "Heavyweight wool throw woven in a soft herringbone pattern.", price: 2799, category: "Home", stock: 20 },
  { name: "Brass Desk Lamp", description: "Adjustable brass lamp with a warm, dimmable bulb.", price: 3299, category: "Home", stock: 5 },
  { name: "Leather Notebook Cover", description: "Full-grain leather cover sized for a standard A5 notebook.", price: 1899, category: "Stationery", stock: 18 },
  { name: "Enamel Camp Mug", description: "Classic speckled enamel mug for coffee, tea, or camp cocoa.", price: 599, category: "Kitchen", stock: 30 },
];

const run = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@shopeasy.com" });
  if (!existingAdmin) {
    const admin = await User.create({
      name: "Admin", email: "admin@shopeasy.com", password: "admin123", role: "admin",
    });
    await User.create({
      name: "Demo User", email: "user@shopeasy.com", password: "user123", role: "user",
    });
    await Product.insertMany(demoProducts.map((p) => ({ ...p, createdBy: admin._id })));
    console.log("Seeded demo accounts and products:");
    console.log("  admin@shopeasy.com / admin123 (admin)");
    console.log("  user@shopeasy.com / user123 (customer)");
  } else {
    console.log("Demo admin already exists — skipping seed.");
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
