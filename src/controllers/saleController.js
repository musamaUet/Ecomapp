import Sales from ".././models/salesModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const salesController = {
  async createSale(req, res) {
    try {
      const { productId, quantity } = req.body;
      // Validate if productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID format",
        });
      }
      //validate input against productId and quantity
      if (!productId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity", success: false });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product Not Found", success: false });
      }

      // Check stock availability
      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock available", success: false });
      }

      // Calculate total price
      const totalPrice = product.price * quantity;

      // Create a sale record
      const sale = new Sales({
        productId: product._id,
        quantity,
        totalPrice,
        category: product.category,
        status: "completed", // Explicitly mark status
        saleDate: new Date(), // Set sale date
      });

      // Save the sale
      await sale.save();

      // Update product stock
      product.stock -= quantity;
      await product.save();

      res
        .status(201)
        .json({
          message: "Sale recorded successfully",
          data: sale,
          success: true,
        });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        success: false,
        message: "Error Making Sales",
        error: error.message,
      });
    }
  },

  // api endpoint fo rgetting sales for a specific categoryand products
  async getSalesDataByCategory(req, res) {
    const { type } = req.query;
    try {
      let groupField;
      if (type === "productId") {
        groupField = "$productId"; // assuming your sales documents have a 'product' field
      } else if (type === "category") {
        groupField = "$category"; // default grouping by category
      } else {
        groupField = "$saleDate";
      }
      const salesData = await Sales.aggregate([
        {
          $group: {
            _id: groupField,
            totalRevenue: { $sum: "$totalPrice" },
            totalUnitsSold: { $sum: "$quantity" },
          },
        },
      ]);

      res.status(200).json({ success: true, data: salesData, success: true });
    } catch (error) {
      console.error("Error fetching sales by category:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },
};

export default salesController;
