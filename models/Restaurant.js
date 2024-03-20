const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [menuSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
