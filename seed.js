require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./db/connectDB");

const Category = require("./models/category.model");
const Product = require("./models/product.model");

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Remove old data
    // Orders will be added later, so for now we only clear Products and Categories

    await Product.deleteMany();

    await Category.deleteMany();

    // Create Categories

    const categories = await Category.create([
      {
        name: "Electronics",
        description: "Electronic devices and gadgets",
        slug: "electronics",
      },

      {
        name: "Clothing",
        description: "Fashion and apparel products",
        slug: "clothing",
      },

      {
        name: "Books",
        description: "Educational and entertainment books",
        slug: "books",
      },
    ]);

    // Create Products

    const products = await Product.create([
      {
        name: "iPhone 17",
        description: "Latest Apple smartphone",
        price: 999,
        stock: 20,
        category: categories[0]._id,
        images: ["iphone.jpg"],
      },

      {
        name: "Gaming Laptop",
        description: "High performance gaming laptop",
        price: 1500,
        stock: 10,
        category: categories[0]._id,
        images: [],
      },

      {
        name: "Premium Hoodie",
        description: "Comfortable cotton hoodie",
        price: 80,
        stock: 50,
        category: categories[1]._id,
        images: [],
      },

      {
        name: "Running Shoes",
        description: "Lightweight sports shoes",
        price: 120,
        stock: 30,
        category: categories[1]._id,
        images: [],
      },

      {
        name: "JavaScript Guide",
        description: "Learn modern JavaScript",
        price: 40,
        stock: 100,
        category: categories[2]._id,
        images: [],
      },

      {
        name: "Backend Development",
        description: "Node.js and API development book",
        price: 60,
        stock: 25,
        category: categories[2]._id,
        images: [],
      },
    ]);

    console.log(
      `Database seeded successfully: ${categories.length} Categories and ${products.length} Products added`,
    );
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();

    console.log("Database disconnected");
  }
};

seedDatabase();
