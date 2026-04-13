# 🍕 Happy Feast - Full Stack Food Delivery Application

Happy Feast is a premium, full-stack food delivery platform built with the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless experience for users to browse menus, manage their carts, and securely pay for their favorite meals, while offering a robust admin dashboard for menu and order management.

## 🚀 Live Demo
*Coming Soon* (Deploying to Vercel/Render)

---

## ✨ Features

### 🛒 Frontend (Customer Application)
- **Fluid User Interface**: Modern, responsive design for a premium dining experience.
- **dynamic Menu**: Browse through various categories and search for your favorite dishes.
- **Smart Shopping Cart**: Real-time cart updates and persistence.
- **Secure Authentication**: JWT-based login and signup.
- **Checkout Process**: Integrated Razorpay payment gateway for secure transactions.
- **Order History**: Track current and past orders with real-time status updates.

### 🛠️ Admin Panel (Management Dashboard)
- **Dashboard Overview**: Quick stats on sales and orders.
- **Inventory Management**: Effortlessly add, update, or remove food items from the menu.
- **Order Fulfillment**: Track and update order statuses (Preparing → Packed → Out for Delivery → Delivered).
- **Image Hosting**: Integrated Cloudinary support for high-quality food photography.

### ⚙️ Backend (API & Database)
- **Scalable Architecture**: Built with Node.js and Express.js.
- **Secure Data Storage**: MongoDB with Mongoose for reliable data modeling.
- **API Security**: Middleware for authentication and global CORS handling.
- **Environment Driven**: Fully configurable via environment variables.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, React Router, Axios |
| **Admin** | React.js, Vite, React Router, React Toastify |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt.js |
| **Payments** | Razorpay |
| **Storage** | Cloudinary / Local Disk Storage |

---

## 📦 Project Structure

```text
happyfeast/
├── Admin/         # React-based Admin Dashboard
├── Backend/       # Node.js/Express API Server
└── Frontend/      # React-based Customer Web App
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account
- Cloudinary account (for image storage)
- Razorpay account (for payments)

### 1. Clone the repository
```bash
git clone https://github.com/2303A52083/happyfeast.git
cd happyfeast
```

### 2. Setup Backend
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
MONGODB_URI=your_mongodb_uri
PORT=4000
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
Run the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

### 4. Setup Admin
```bash
cd ../Admin
npm install
npm run dev
```

---

## 📜 License
Integrated under the ISC License.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by [2303A52083](https://github.com/2303A52083)
