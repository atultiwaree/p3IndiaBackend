const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
