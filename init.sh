#!/bin/bash

# Create main project directory
mkdir ecommerce-backend
cd ecommerce-backend || exit

# Initialize npm and create package.json
npm init -y

# Install necessary packages (example: express, mongoose, nodemailer, etc.)
npm install express mongoose nodemailer jsonwebtoken bcryptjs dotenv

# Create subdirectories and files
mkdir -p config controllers middlewares models routes utils views/emailTemplates public/uploads tests

# Create config files
touch config/db.js config/keys.js config/nodemailer.js

# Create controller files
touch controllers/adminController.js controllers/authController.js controllers/orderController.js \
controllers/productController.js controllers/userController.js controllers/promotionController.js

# Create middleware files
touch middlewares/auth.js middlewares/adminAuth.js middlewares/validation.js

# Create model files
touch models/Admin.js models/Order.js models/Product.js models/User.js models/Review.js models/Cart.js \
models/Wishlist.js models/Promotion.js models/ActivityLog.js

# Create route files
touch routes/adminRoutes.js routes/authRoutes.js routes/orderRoutes.js routes/productRoutes.js \
routes/userRoutes.js routes/promotionRoutes.js

# Create utility files
touch utils/logger.js utils/emailTemplates.js utils/errorHandler.js utils/constants.js

# Create view files
touch views/emailTemplates/orderConfirmation.html views/emailTemplates/shippingUpdate.html \
views/emailTemplates/promotional.html

# Create public directory
mkdir public/uploads

# Create tests directory
mkdir tests

# Create root level files
touch .env .gitignore app.js README.md

# Add basic content to .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# Add basic content to README.md
echo "# Ecommerce Backend" >> README.md
echo "## Project setup" >> README.md
echo "\`\`\`bash" >> README.md
echo "npm install" >> README.md
echo "\`\`\`" >> README.md

echo "Project structure and Node.js environment initialized successfully!"
