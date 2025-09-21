const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Razorpay order
router.post("/order", async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const options = {
            amount: amount * 100, // Razorpay uses paise
            currency: currency || "INR",
            receipt: `rcpt_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        res.json({ order, key: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Order creation failed" });
    }
});

module.exports = router;
