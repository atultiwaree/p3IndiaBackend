const mongoose = require('mongoose');
const Shop = require('./models/Shop');
require('dotenv').config();

const sampleShops = [
  {
    shopName: 'Sharma Kirana Store',
    shopId: 'SHOP001',
    ownerName: 'Ramesh Sharma',
    phone: '9876543210',
    address: 'Sector 22, Chandigarh',
  },
  {
    shopName: 'Gupta General Store',
    shopId: 'SHOP002',
    ownerName: 'Amit Gupta',
    phone: '9123456780',
    address: 'Manimajra, Chandigarh',
  },
  {
    shopName: 'Patel Provision Store',
    shopId: 'SHOP003',
    ownerName: 'Suresh Patel',
    phone: '9988776655',
    address: 'Zirakpur, Punjab',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Shop.deleteMany(); // Optional: clears old data
    await Shop.insertMany(sampleShops);
    console.log('Sample shops inserted');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('MongoDB error:', err);
  });
