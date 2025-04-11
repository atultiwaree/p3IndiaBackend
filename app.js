const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const distributorRoutes = require("./routes/distributor");
const orderRoutes = require("./routes/order");
const shopRoutes = require('./routes/shop');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/distributors", distributorRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/shops', shopRoutes);


app.get('/', (req, res) => {
  return res.json({success : true})
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
