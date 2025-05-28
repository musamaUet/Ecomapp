import mongoose from "mongoose";
const { Schema } = mongoose;

const inventorySchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
    },
    minimumStockLevel: {
      type: Number,
      required: true,
      default: 10,
    },
    lastRestockDate: {
      type: Date,
      default: Date.now,
    },
    lastStockCheck: {
      type: Date,
      default: Date.now,
    },
    stockMovements: [
      {
        type: {
          type: String,
          enum: ["purchase", "sale", "adjustment", "return"],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        reference: {
          type: String,
          required: false,
        },
        notes: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema, "inventory");
