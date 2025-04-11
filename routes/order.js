const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
  const { retailerId, distributorId, items } = req.body;

  const order = await Order.create({ retailerId, distributorId, items });
  res.json(order);
});

module.exports = router;
