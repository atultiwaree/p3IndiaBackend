const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  shopId: { type: String, required: true, unique: true },
  ownerName: String,
});

module.exports = mongoose.model('Shop', shopSchema);
