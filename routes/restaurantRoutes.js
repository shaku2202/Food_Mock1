const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/restaurants (Protected Route)
router.post('/', restaurantController.createRestaurant);

// GET /api/restaurants
router.get('/', restaurantController.getAllRestaurants);

// GET /api/restaurants/:id
router.get('/:id', restaurantController.getRestaurantById);

// GET /api/restaurants/:id/menu
router.get('/:id/menu', restaurantController.getRestaurantMenu);

// POST /api/restaurants/:id/menu (Protected Route)
router.post('/:id/menu', restaurantController.addMenuItem);

// DELETE /api/restaurants/:id/menu/:menuId (Protected Route)
router.delete('/:id/menu/:menuId', restaurantController.deleteMenuItem);

module.exports = router;
