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


// POST /api/add-shop
router.post('/add-shop', async (req, res) => {
  const { shopName, shopId, ownerName } = req.body;

  if (!shopName || !shopId) {
    return res.status(400).json({ message: 'Shop Name and ID are required' });
  }

  try {
    const existing = await Shop.findOne({ shopId });

    if (existing) {
      return res.status(409).json({ message: 'Shop ID already exists' });
    }

    const shop = new Shop({ shopName, shopId, ownerName });
    await shop.save();

    res.status(201).json({ message: 'Shop added successfully' });
  } catch (err) {
    console.error('Error adding shop:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all shops
router.get('/', async (req, res) => {
  const shops = await Shop.find();

  console.log(shops)

  return res.json(shops);
});

module.exports = router;
