import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router.post("/create", productController.createProduct);
router.post("/category", productController.fetchByCategory);
router.get("/get-all", productController.fetchAllProducts);

export default router;
