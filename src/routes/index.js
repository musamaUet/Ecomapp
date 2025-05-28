import express from "express";
import productRoutes from "./productRoutes.js";
import saleRoutes from "./saleRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
const router = express.Router();

router.use("/inventory", inventoryRoutes);
router.use("/product", productRoutes);
router.use("/sale", saleRoutes);
export default router;
