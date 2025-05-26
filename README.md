# E-commerce Application API

A robust e-commerce backend API built with Node.js, Express, and MongoDB that handles products, sales, and inventory management.

## Features

### Product Management
- Create, read, update, and delete products
- Product categorization
- Stock tracking


### Sales Management
- Record sales transactions
- Track sales history
- Handle different sale statuses (completed, refunded, pending)
- Link sales with products

### Inventory Management
- Real-time stock tracking
- Minimum stock level alerts

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get single sale
- `POST /api/sales` - Create new sale

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get single inventory item
- `GET /api/inventory/low-stock` - Get low stock items
- `POST /api/inventory` - Create new inventory item
- `PUT /api/inventory/:id` - Update inventory item

## Data Models

### Product Schema
```javascript
{
    title: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    stock: Number
}
```

### Sales Schema
```javascript
{
    productId: ObjectId,
    quantity: Number,
    totalPrice: Number,
    category: String,
    saleDate: Date,
    status: String
}
```

### Inventory Schema
```javascript
{
    productId: ObjectId,
    currentStock: Number,
    minimumStockLevel: Number,
    lastRestockDate: Date,
    lastStockCheck: Date,
    stockMovements: [{
        type: String,
        quantity: Number,
        date: Date,
        reference: String,
        notes: String
    }]
}
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd EcomAPP
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
npm start
```

## Development

- The application uses ES modules
- MongoDB is used as the database
- Express.js for routing and middleware
- Mongoose for MongoDB object modeling

## Error Handling

The API implements comprehensive error handling:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error


## License

This project is licensed under the MIT License - see the LICENSE file for details. 