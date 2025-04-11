const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// Create shop
router.post('/', async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create shop' });
  }
});

// Get all shops
router.get('/', async (req, res) => {
  const shops = await Shop.find();
  return res.json(shops);
});

module.exports = router;
