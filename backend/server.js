// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(express.json());

// Allow requests from anywhere (or just from your local frontend)
app.use(cors({
  origin: "*", // You can restrict later if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// API Routes
app.use("/api/orders", orderRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../views"))); 

app.use(express.static(path.join(__dirname, "../public")));


// For any route not starting with /api, serve index.html (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
 
app.use(express.static('public'));
