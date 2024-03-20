const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/orders (Protected Route)
router.post('/',orderController.placeOrder);

// GET /api/orders/:id (Protected Route)
router.get('/:id',orderController.getOrderById);

// PUT /api/orders/:id (Protected Route)
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;
