const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
});

const productRequestSchema = new mongoose.Schema({
  billId: String,
  date: String,
  shopId: String,
  distributorId: String,
  products: [productSchema],
});

module.exports = mongoose.model('ProductRequest', productRequestSchema);
