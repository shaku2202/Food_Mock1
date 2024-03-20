const Order = require('../models/Order');

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;
    const order = new Order({ user, restaurant, items, totalPrice, deliveryAddress });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user restaurant');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(204).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { placeOrder, getOrderById, updateOrderStatus };
