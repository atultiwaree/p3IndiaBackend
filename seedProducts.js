const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const distributorId = '67f873dca0ae587ec17dbc63'; // Replace with actual ObjectId

const sampleProducts = [
  {
    name: 'Parle-G Biscuit',
    productCode: 'P001',
    quantity: 100,
    distributorId,
  },
  {
    name: 'Maggi Noodles',
    productCode: 'P002',
    quantity: 80,
    distributorId,
  },
  {
    name: 'Tata Salt',
    productCode: 'P003',
    quantity: 150,
    distributorId,
  },
  {
    name: 'Colgate Toothpaste',
    productCode: 'P004',
    quantity: 60,
    distributorId,
  },
  {
    name: 'Aashirvaad Atta',
    productCode: 'P005',
    quantity: 40,
    distributorId,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    await Product.deleteMany(); // Optional
    await Product.insertMany(sampleProducts);
    console.log('Products inserted');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));
