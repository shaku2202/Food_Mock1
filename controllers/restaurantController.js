const Restaurant = require('../models/Restaurant');

// Create a new restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, address, menu } = req.body;
    const restaurant = new Restaurant({ name, address, menu });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get restaurant menu by ID
const getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant.menu);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new menu item to a restaurant
const addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, description, price, image } = req.body;
    const menuItem = { name, description, price, image };
    restaurant.menu.push(menuItem);
    await restaurant.save();

    res.status(201).json(menuItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a menu item from a restaurant
const deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menuItemId = req.params.menuId;
    restaurant.menu = restaurant.menu.filter(item => item._id.toString() !== menuItemId);
    await restaurant.save();

    res.status(202).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createRestaurant, getAllRestaurants, getRestaurantById, getRestaurantMenu, addMenuItem, deleteMenuItem };
