const express = require('express');
const Distributor = require('../models/Distributor');
const Product = require('../models/Product');
const router = express.Router();

// // Get all distributors
// router.get('/', async (req, res) => {
//   const list = await Distributor.find();
//   res.json(list);
// });


// GET all distributors (name + ID)
router.get("/", async (req, res) => {
  try {
    const distributors = await Distributor.find({}, { name: 1, distributorId: 1 });

    console.log(distributors, "::::")


    return res.json(distributors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch distributors" });
  }
});


// GET distributor by name to return its ID
router.get("/by-name/:name", async (req, res) => {
  try {
    const distributor = await Distributor.findOne({ name: req.params.name });
    if (!distributor) return res.status(404).json({ error: "Distributor not found" });

    res.json({ distributorId: distributor.distributorId });
  } catch (error) {
    res.status(500).json({ error: "Error fetching distributor" });
  }
});



// GET /api/distributors/:distributorId/products
router.get('/:distributorId/products', async (req, res) => {

  console.log(req.params.distributorId)

  try {
    const products = await Product.find({ distributorId: req.params.distributorId }).select('productCode quantity');
    console.log(products)
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;
