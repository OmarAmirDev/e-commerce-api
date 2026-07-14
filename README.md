# E-Commerce Backend API

A complete REST API backend for an e-commerce platform built with Node.js, Express, MongoDB, and Mongoose.

## Features

- Product Management
- Category Management
- Shopping Cart
- Order Checkout System
- MongoDB Database
- MVC Architecture
- Error Handling

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Routes

### Categories

GET /api/categories

POST /api/categories

GET /api/categories/:id

PATCH /api/categories/:id

DELETE /api/categories/:id


### Products

GET /api/products

GET /api/products/:id

POST /api/products

PATCH /api/products/:id

DELETE /api/products/:id


### Cart

GET /api/cart

POST /api/cart/items

PATCH /api/cart/items/:productId

DELETE /api/cart/items/:productId

DELETE /api/cart


### Orders

POST /api/orders

GET /api/orders

GET /api/orders/:id

PATCH /api/orders/:id/status


## Setup

Install dependencies:

npm install


Create .env:

PORT=5000
MONGO_URI=your_connection_string


Run:

npm run dev