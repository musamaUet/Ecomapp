import express from 'express'
import salesController from '../controllers/saleController.js';
const router=express.Router();

router.post('/create',salesController.createSale);
router.get('/category',salesController.getSalesDataByCategory)


export default router