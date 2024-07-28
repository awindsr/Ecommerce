# E-commerce Frontend

This is the frontend part of a comprehensive single-brand e-commerce application. It is built using React, Vite, and Tailwind CSS.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## File Structure

The project is organized as follows:

```
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
