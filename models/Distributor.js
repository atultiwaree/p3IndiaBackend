const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distributorId: { type: String, required: true, unique: true },
  products: [
    {
      code: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ]
});

module.exports = mongoose.model("Distributor", distributorSchema);
