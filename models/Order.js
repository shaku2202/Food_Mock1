const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [{
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number, required: true },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: { type: String, enum: ['placed', 'preparing', 'on the way', 'delivered'], default: 'placed' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
