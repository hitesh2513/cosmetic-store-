// backend/models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      image: String
    }
  ],
  paymentStatus: { type: String, default: "Pending" },
  deliveryStatus: { type: String, default: "Processing" },
  date: { type: Date, default: Date.now },
  razorpayOrderId: String,
  razorpayPaymentId: String
});

module.exports = mongoose.model("Order", orderSchema);
