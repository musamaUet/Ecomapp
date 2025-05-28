import express from "express";
import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();
// Get all inventory items
router.get("/", inventoryController.getAllInventory);
// Get low stock items
router.get("/low-stock", inventoryController.getLowStockItems);

// Get single inventory item
router.get("/:id", inventoryController.getInventoryItem);

// Create new inventory item
router.post("/", inventoryController.createInventoryItem);

// Update inventory item
router.put("/:id", inventoryController.updateInventoryItem);

// // Add stock movement
// router.post('/:id/movement', addStockMovement);

// // Get stock movement history
// router.get('/:id/movements', getStockMovementHistory);

export default router;
