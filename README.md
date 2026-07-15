# 🛒 E-Commerce Backend API

A complete RESTful E-Commerce Backend API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** following the **MVC Architecture**.

The API provides full CRUD operations for categories and products, a persistent shopping cart, and a complete checkout system that converts carts into permanent orders.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- express-validator
- express-mongo-sanitize
- Nodemon

---

# ✨ Features

- Categories CRUD API
- Products CRUD API
- Product filtering and searching
- Category population using `populate()`
- Persistent Shopping Cart
- Automatic total price calculation
- Complete Checkout & Orders System
- Database Seed Script
- Centralized Error Handling
- MVC Project Structure

---

# 📋 Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or newer recommended)
- npm
- MongoDB Atlas account (or a local MongoDB server)
- Git

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/OmarAmirDev/e-commerce-api.git
```

## 2. Navigate to the project

```bash
cd e-commerce-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create a `.env` file

Copy the contents of `.env.example` into a new `.env` file and fill in your own values.

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
```

## 5. Seed the database

```bash
npm run seed
```

This creates sample Categories and Products.

## 6. Start the development server

```bash
npm run dev
```

The API will run at:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port |
| NODE_ENV | Environment (development/production) |
| MONGO_URI | MongoDB connection string |

---

# 📚 API Endpoints

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create category |
| PATCH | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

---

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product |
| PATCH | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Supported Query Parameters

| Query | Description |
|-------|-------------|
| `category` | Filter by category ID |
| `minPrice` | Minimum price |
| `maxPrice` | Maximum price |
| `inStock` | Filter available products |
| `search` | Search by product name or description |

Example:

```
GET /api/products?minPrice=100&maxPrice=500
```

---

## Cart

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/cart` | View cart |
| POST | `/api/cart/items` | Add product to cart |
| PATCH | `/api/cart/items/:productId` | Update quantity |
| DELETE | `/api/cart/items/:productId` | Remove item |
| DELETE | `/api/cart` | Clear cart |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/orders` | Checkout cart |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| PATCH | `/api/orders/:id/status` | Update order status |

---

# 📁 Project Structure

```
e-commerce-api/
│
├── config/
├── controllers/
├── db/
├── middleware/
├── models/
├── postman/
├── routes/
├── utils/
│
├── app.js
├── seed.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### Folder Overview

- **config/** → Application configuration
- **controllers/** → Business logic
- **db/** → MongoDB connection
- **middleware/** → Custom middleware & error handling
- **models/** → Mongoose schemas
- **postman/** → API collection
- **routes/** → Express routes
- **utils/** → Utility classes and helpers

---

# 🧪 Testing

The project includes a complete Postman Collection for testing every endpoint.

Import the collection from the `postman/` folder and start testing immediately.

---

# 📦 NPM Scripts

```bash
npm run dev      # Start development server

npm start        # Start production server

npm run seed     # Populate database with sample data
```

---

# 👨‍💻 Author

**Omar Amir**

GitHub: https://github.com/OmarAmirDev

---

# 📄 License

This project is licensed under the ISC License.