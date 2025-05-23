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
    const distributors = await Distributor.find({}, { name: 1, distributorId: 1, products: 1 });
    return res.json(distributors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch distributors" });
  }
});

// GET distributor by distributorId
router.get('/:distributorId', async (req, res) => {
  try {
    const distributor = await Distributor.findOne({ distributorId: req.params.distributorId });
    
    if (!distributor) {
      return res.status(404).json({ message: 'Distributor not found' });
    }

    res.json(distributor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching distributor', error });
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



// Add or update distributor and products
router.post('/add-distributor', async (req, res) => {
  try {
    const { name, distributorId, products } = req.body;

    let distributor = await Distributor.findOne({ distributorId });

    if (!distributor) {
      // Create new distributor if not found
      const newDistributor = new Distributor({ name, distributorId, products });
      await newDistributor.save();
      return res.status(201).json({ message: 'Distributor added successfully', data: newDistributor });
    }

    // Update name if changed
    distributor.name = name;

    // Map current products to update or add
    products.forEach((newProd) => {
      const index = distributor.products.findIndex(p => p.code === newProd.code);
      if (index > -1) {
        // Update existing product
        distributor.products[index] = { ...distributor.products[index], ...newProd };
      } else {
        // Add new product
        distributor.products.push(newProd);
      }
    });

    await distributor.save();
    res.status(200).json({ message: 'Distributor updated successfully', data: distributor });

  } catch (error) {
    console.error('Error adding/updating distributor:', error);
    res.status(500).json({ message: 'Error processing distributor', error });
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

router.delete('/:distributorId', async (req, res) => {
  try {
    const distributor = await Distributor.findOneAndDelete({ distributorId: req.params.distributorId });

    if (!distributor) {
      return res.status(404).json({ message: 'Distributor not found' });
    }

    // Deleting related products
    await Product.deleteMany({ distributorId: req.params.distributorId });

    // Send success response
    return res.status(200).json({
      message: 'Distributor and related products deleted successfully',
      data: distributor, // Send deleted distributor's info for frontend use (optional)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete distributor', error });
  }
});

router.put('/:distributorId', async (req, res) => {
  try {
    const updatedDistributor = await Distributor.findOneAndUpdate(
      { distributorId: req.params.distributorId }, // <-- match by distributorId
      req.body,
      { new: true }
    );

    if (!updatedDistributor) {
      return res.status(404).json({ message: 'Distributor not found' });
    }

    res.json(updatedDistributor);
  } catch (error) {
    console.error('Error updating distributor:', error);
    res.status(500).json({ message: 'Error updating distributor', error });
  }
});



module.exports = router;
