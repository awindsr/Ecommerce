// controllers/orderController.js

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Invoice = require('../utils/invoiceGenerator');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Create a new order
exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { userId, items, shippingAddress, paymentMethod } = req.body;

  try {
    let orderTotal = 0;
    let orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ msg: `Product not found: ${item.productId}` });

      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: `Not enough stock for product: ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      const totalPrice = item.quantity * product.price;
      orderTotal += totalPrice;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        totalPrice,
      });
    }

    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: orderTotal,
    });

    await order.save();
    const user = await User.findById(userId);
    user.orders.push(order._id);
    await user.save();

    // Generate and send invoice (optional)
    Invoice.generateInvoice(order, user);

    res.json(order);
  } catch (error) {
    logger.error('Error creating order: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    logger.error('Error fetching all orders: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.user;

  try {
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    logger.error('Error fetching user orders: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update order status (for admin)
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    logger.error('Error updating order status: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    if (order.status !== 'Pending') return res.status(400).json({ msg: 'Only pending orders can be cancelled' });

    order.status = 'Cancelled';
    await order.save();

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      product.stock += item.quantity;
      await product.save();
    }

    res.json({ msg: 'Order cancelled successfully' });
  } catch (error) {
    logger.error('Error cancelling order: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Generate and send invoice (optional)
exports.sendInvoice = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId).populate('user');
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Generate invoice
    const invoice = await Invoice.generateInvoice(order, order.user);
    res.json(invoice);
  } catch (error) {
    logger.error('Error generating invoice: ', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
