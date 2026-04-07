import express from 'express'
import authMiddleware from '../middleware/auth.js'
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder
} from '../controllers/orderController.js'

const orderRouter = express.Router();

// ✅ Place Order
orderRouter.post('/place', authMiddleware, placeOrder)

// ✅ Verify Payment
orderRouter.post('/verify', verifyOrder)

// ✅ User Orders
orderRouter.post('/userorders', authMiddleware, userOrders)

// ✅ Admin - Get all orders
orderRouter.get('/list', listOrders)

// 🔥 FIXED: Update Order Status
orderRouter.put('/:id', updateStatus)

export default orderRouter

 
