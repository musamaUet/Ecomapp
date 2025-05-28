import Inventory from "../models/inventoryModel.js";
import Product from "../models/productModel.js";

const inventoryController = {
  async getAllInventory(req, res) {
    try {
      const inventory = await Inventory.find().populate("productId");
      res.status(200).json({
        success: true,
        message: "Invnetory list fetched successfully",
        data: inventory,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
  async getInventoryItem(req, res) {
    try {
      console.log("id", req.params.id);
      const inventory = await Inventory.findById(req.params.id).populate(
        "productId"
      );

      if (!inventory) {
        return res
          .status(404)
          .json({ message: "Inventory item not found", success: false });
      }
      res.status(200).json({
        success: true,
        message: "Invnetory fetched successfully",
        data: inventory,
      });
    } catch (error) {
      console.log("eror ", error);
      res.status(500).json({ message: error.message, success: false });
    }
  },
  async createInventoryItem(req, res) {
    try {
      const { productId, currentStock, minimumStockLevel } = req.body;

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found", success: false });
      }

      // Check if inventory already exists for this product
      const existingInventory = await Inventory.findOne({ productId });
      if (existingInventory) {
        return res.status(400).json({
          message: "Inventory already exists for this product",
          success: false,
        });
      }

      const inventory = new Inventory({
        productId,
        currentStock,
        minimumStockLevel,
      });

      // Update product stock
      product.stock += currentStock;
      await product.save();

      const savedInventory = await inventory.save();
      res.status(201).json({
        success: true,
        message: "Invnetory saved successfully",
        data: savedInventory,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
  async updateInventoryItem(req, res) {
    try {
      const { currentStock, minimumStockLevel } = req.body;
      const inventory = await Inventory.findById(req.params.id);

      if (!inventory) {
        return res.status(404).json({ message: "Inventory item not found" });
      }

      inventory.currentStock = currentStock || inventory.currentStock;
      inventory.minimumStockLevel =
        minimumStockLevel || inventory.minimumStockLevel;

      const updatedInventory = await inventory.save();
      res.status(200).json({
        success: true,
        message: "Invnetory updated successfully",
        data: updatedInventory,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getLowStockItems(req, res) {
    try {
      const lowStockItems = await Inventory.find({
        $expr: {
          $lte: ["$currentStock", "$minimumStockLevel"],
        },
      }).populate("productId");
      console.log("low sock", lowStockItems);

      res.status(200).json({
        success: true,
        message: "Low stock Invnetory Items fetched successfully",
        data: lowStockItems,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
};
export default inventoryController;
