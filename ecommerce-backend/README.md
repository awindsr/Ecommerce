# E-commerce Backend Template

This repository contains the backend code for a comprehensive single-brand e-commerce application. The backend is built using Node.js, Express, and MongoDB, with Mongoose for object data modeling. The application provides features for user and admin management, product management, order processing, inventory tracking, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### User Features
- User signup, login, and authentication
- Profile management (update email, password, phone number)
- Address management (add, update, delete)
- View purchase history
- Manage wishlist and cart
- Product reviews and ratings
- Order placement and tracking
- Apply promotion codes during checkout
- Receive email notifications for order updates

### Admin Features
- Admin login and role-based permissions management
- User management (view, update, delete)
- Product management (CRUD operations, image uploads)
- Order management (view, update order status, manage invoices)
- Inventory management (track stock levels, manage warehouse locations)
- Promotion management (create and manage promotion codes)
- View and manage user activities and logs

### General Features
- Secure API with JWT authentication
- Input validation and error handling
- CORS configuration
- Static file serving
- Logging with Morgan
- Secure headers with Helmet

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/awindsr/ecommerce-backend-template.git
   cd ecommerce-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     NODE_ENV=development
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     CLIENT_URL=http://localhost:3000
     ```

4. **Run the server**:
   ```bash
   npm start
   ```

## Environment Variables

- `NODE_ENV`: Application environment (e.g., development, production).
- `PORT`: Port on which the server runs.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `CLIENT_URL`: URL of the frontend application.

## Usage

The application provides a RESTful API for managing users, products, orders, and more. Below are some of the primary endpoints:

- **Authentication**:
  - `POST /api/auth/signup`: User signup
  - `POST /api/auth/login`: User login

- **Users**:
  - `GET /api/users/me`: Get current user's profile
  - `PUT /api/users/me`: Update current user's profile

- **Products**:
  - `GET /api/products`: Get all products
  - `POST /api/products`: Create a new product (Admin only)

- **Orders**:
  - `GET /api/orders`: Get all orders (Admin only)
  - `POST /api/orders`: Create a new order

- **Promotions**:
  - `GET /api/promotions`: Get all promotions
  - `POST /api/promotions`: Create a new promotion (Admin only)

For a full list of endpoints and their details, refer to the API documentation.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements, bug fixes, or new features.
