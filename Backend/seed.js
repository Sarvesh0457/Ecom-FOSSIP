import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./src/models/Product.js"; 
import productsData from "./src/data/products.json" with { type: "json" };

dotenv.config({ path: "./.env" });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log("✅ Connected to Database");

    // CRITICAL FIX: Drop the entire collection to destroy the old ghost indexes
    try {
      await mongoose.connection.db.dropCollection('products');
      console.log("🗑️ Completely wiped old products collection and indexes");
    } catch (err) {
      console.log("ℹ️ No existing collection found, starting fresh.");
    }

    // Insert all products from the JSON file
    await Product.insertMany(productsData);
    console.log("🚀 Success! All products added to MongoDB");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding Error: ", error);
    process.exit(1);
  }
};

seedDatabase();