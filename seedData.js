const mongoose = require("mongoose");

async function seedData() {
  await mongoose.connect("mongodb://localhost:27017/retailapp");

  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
  });

  const distributorSchema = new mongoose.Schema({
    name: String,
    distributorId: String,
    products: [
      {
        code: String,
        name: String,
        price: Number,
      },
    ],
  });

  const shopSchema = new mongoose.Schema({
    name: String,
    ownerId: mongoose.Schema.Types.ObjectId,
    distributorId: mongoose.Schema.Types.ObjectId,
  });

  const orderSchema = new mongoose.Schema({
    billId: String,
    date: { type: Date, default: Date.now },
    shopId: mongoose.Schema.Types.ObjectId,
    distributorId: mongoose.Schema.Types.ObjectId,
    items: [
      {
        productCode: String,
        quantity: Number,
      },
    ],
  });

  const User = mongoose.model("User", userSchema);
  const Distributor = mongoose.model("Distributor", distributorSchema);
  const Shop = mongoose.model("Shop", shopSchema);
  const Order = mongoose.model("Order", orderSchema);

  await User.deleteMany({});
  await Distributor.deleteMany({});
  await Shop.deleteMany({});
  await Order.deleteMany({});

  const users = await User.insertMany([
    {
      username: "kirana_store_01",
      email: "hello@atul.com",
      password: "Qwerty@1234",
      role: "retailer",
    },
    {
      username: "kirana_store_02",
      email: "store02@example.com",
      password: "123456",
      role: "retailer",
    },
  ]);

  const distributors = await Distributor.insertMany([
    {
      name: "P3 Beverages",
      distributorId: "P3-001",
      products: [
        { code: "P3-APPLE", name: "Apple Juice", price: 40 },
        { code: "P3-MANGO", name: "Mango Juice", price: 35 },
      ],
    },
    {
      name: "FreshMart",
      distributorId: "FM-009",
      products: [
        { code: "FM-MILK", name: "Full Cream Milk", price: 50 },
        { code: "FM-BREAD", name: "Whole Wheat Bread", price: 25 },
      ],
    },
  ]);

  const shops = await Shop.insertMany([
    {
      name: "Om Kirana Store",
      ownerId: users[0]._id,
      distributorId: distributors[0]._id,
    },
    {
      name: "Ravi General Store",
      ownerId: users[1]._id,
      distributorId: distributors[1]._id,
    },
  ]);

  await Order.create({
    billId: "BILL001",
    shopId: shops[0]._id,
    distributorId: distributors[0]._id,
    items: [
      { productCode: "P3-APPLE", quantity: 10 },
      { productCode: "P3-MANGO", quantity: 5 },
    ],
  });

  console.log("✅ Sample data inserted!");
  await mongoose.disconnect();
}

seedData().catch(console.error);
