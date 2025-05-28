import mongoose from "mongoose";
const { Schema } = mongoose;

const saleSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    category: { type: String, required: true },
    saleDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["completed", "refunded", "pending"],
      default: "completed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sales", saleSchema, "sales");
