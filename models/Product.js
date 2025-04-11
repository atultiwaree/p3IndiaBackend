const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
  productCode: String,
  name: String,
  quantity: Number,
});

module.exports = mongoose.model('Product', productSchema);
