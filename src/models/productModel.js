import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema, "products");
