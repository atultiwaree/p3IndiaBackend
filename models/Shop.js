const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  shopId: { type: String, required: true, unique: true },
  ownerName: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model('Shop', shopSchema);
