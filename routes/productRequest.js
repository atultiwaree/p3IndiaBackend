const express = require('express');
const router = express.Router();
const ProductRequest = require('../models/ProductRequest');

// POST route to save product request
router.post('/save', async (req, res) => {
  try {
    const { billId, date, shopId, distributorId, products } = req.body;

    const newRequest = new ProductRequest({
      billId,
      date,
      shopId,
      distributorId,
      products,
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: 'Product request saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
