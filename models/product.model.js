const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },


    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },


    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },


    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },


    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },


    images: {
      type: [String],
      default: [],
    },
  },


  {
    timestamps: true,
  }
);


// Virtual field
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});


// Allow virtuals to appear in JSON responses
productSchema.set("toJSON", {
  virtuals: true,
});


productSchema.set("toObject", {
  virtuals: true,
});


module.exports = mongoose.model("Product", productSchema);