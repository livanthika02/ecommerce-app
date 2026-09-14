import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

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
  },
  { 
    name: "Brass Desk Lamp", 
    description: "Adjustable brass lamp with a warm, dimmable bulb", 
    price: 95, 
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "Lighting",
    stock: 12
  },
  { 
    name: "Leather Notebook Cover", 
    description: "Full-grain leather cover sized for standard notebooks", 
    price: 35, 
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363",
    category: "Stationery",
    stock: 15
  },
  { 
    name: "Enamel Camp Mug", 
    description: "Classic speckled enamel mug for coffee or tea", 
    price: 18, 
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38",
    category: "Home",
    stock: 20
  }
];

const run = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@shopeasy.com" });
  let admin = existingAdmin;

  if (!existingAdmin) {
    admin = await User.create({
      name: "Admin", email: "admin@shopeasy.com", password: "admin123", role: "admin",
    });
    await User.create({
      name: "Demo User", email: "user@shopeasy.com", password: "user123", role: "user",
    });
  }

  await Product.deleteMany({});
  await Product.insertMany(demoProducts.map((p) => ({ ...p, createdBy: admin._id })));
  console.log("Seeded demo accounts and products successfully!");
  process.exit();
};

run();