import Product from '../models/productModel.js'

const productController = {
    async createProduct(req, res) {
        try {
            const { title, description, price, category, brand, stock } = req.body;
            const newProduct = new Product({
                title,
                description,
                price,
                category,
                brand,
                stock
            })
            const savedProduct = await newProduct.save();
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: savedProduct
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating product',
                error: error.message
            });
        }
    },
    async fetchAllProducts(req, res) {
        try {
            const allProducts = await Product.find()
            res.status(201).json({
                success: true,
                message: 'Products Fetched Successfully',
                data: allProducts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching Product',
                error: error.message
            });
        }
    },
    async fetchByCategory(req, res) {
        try {
            const { category } = req.body;
            const productFetched = await Product.find({ category });
            const productCount=productFetched.length;
            if (!productFetched || productFetched.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No products found for this category'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Products Fetched Successfully',
                data: {
                    productCount,
                    productFetched
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching Products',
                error: error.message
            });
        }
    }
}

export default productController;