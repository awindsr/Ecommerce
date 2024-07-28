#!/bin/bash

# Project Name
PROJECT_NAME="ecommerce-frontend"

# Create project directory
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize Vite project with React and TypeScript template
npm create vite@latest . -- --template react

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Set up Tailwind in the CSS
cat <<EOT > src/assets/styles/tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOT

# Configure Tailwind to remove unused styles in production
cat <<EOT > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOT

# Create directory structure
mkdir -p src/{api,assets/{images,icons,styles},components/{common,auth,user,product,cart,admin,home},context,hooks,pages,router,utils}
touch src/assets/styles/custom.css
touch src/components/common/{Button.jsx,Loader.jsx,Modal.jsx,Navbar.jsx}
touch src/components/auth/{LoginForm.jsx,SignupForm.jsx,ForgotPasswordForm.jsx}
touch src/components/user/{UserProfile.jsx,UserOrders.jsx,UserAddressBook.jsx,UserWishlist.jsx}
touch src/components/product/{ProductList.jsx,ProductDetails.jsx,ProductReview.jsx}
touch src/components/cart/{Cart.jsx,CartItem.jsx,Checkout.jsx}
touch src/components/admin/{AdminDashboard.jsx,ManageUsers.jsx,ManageProducts.jsx,ManageOrders.jsx,ManagePromotions.jsx,AdminReports.jsx}
touch src/components/home/{Home.jsx,FeaturedProducts.jsx,Categories.jsx,Banner.jsx}
touch src/context/{AuthContext.js,CartContext.js,UserContext.js}
touch src/hooks/{useAuth.js,useFetch.js,useCart.js}
touch src/pages/{HomePage.jsx,LoginPage.jsx,SignupPage.jsx,ProductPage.jsx,CartPage.jsx,CheckoutPage.jsx,ProfilePage.jsx,AdminPage.jsx,NotFoundPage.jsx}
touch src/router/{AppRouter.jsx,ProtectedRoute.jsx}
touch src/utils/{constants.js,helpers.js,validators.js}

# Update index.html with correct path for Tailwind CSS
sed -i '' 's|<style>|<link rel="stylesheet" href="/src/assets/styles/tailwind.css">\n<style>|' index.html

# Create .env file
cat <<EOT > .env
# Environment variables
VITE_API_BASE_URL=http://localhost:5000/api
EOT

# Create README.md
cat <<EOT > README.md
# E-commerce Frontend

This is the frontend part of a comprehensive single-brand e-commerce application. It is built using React, Vite, and Tailwind CSS.

## Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/ecommerce-frontend.git
   cd ecommerce-frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## File Structure

The project is organized as follows:

\`\`\`
ecommerce-frontend/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── index.html
├── src/
│   ├── api/
│   │   ├── authAPI.js
│   │   ├── productAPI.js
│   │   ├── orderAPI.js
│   │   ├── userAPI.js
│   │   └── promotionAPI.js
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       ├── tailwind.css
│   │       └── custom.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Navbar.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── ForgotPasswordForm.jsx
│   │   ├── user/
│   │   │   ├── UserProfile.jsx
│   │   │   ├── UserOrders.jsx
│   │   │   ├── UserAddressBook.jsx
│   │   │   └── UserWishlist.jsx
│   │   ├── product/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductReview.jsx
│   │   ├── cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── Checkout.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   ├── ManageProducts.jsx
│   │   │   ├── ManageOrders.jsx
│   │   │   ├── ManagePromotions.jsx
│   │   │   └── AdminReports.jsx
│   │   └── home/
│   │       ├── Home.jsx
│   │       ├── FeaturedProducts.jsx
│   │       ├── Categories.jsx
│   │       └── Banner.jsx
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   └── UserContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useCart.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── router/
│   │   ├── AppRouter.jsx
│   │   └── ProtectedRoute.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── index.jsx
│   ├── main.jsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
\`\`\`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
EOT

# Finish
echo "Project setup complete! Navigate to $PROJECT_NAME and start coding."
