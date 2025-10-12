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

// Allow requests from anywhere (can restrict later)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// API Routes
app.use("/api/orders", orderRoutes);

// Serve static files from 'views' for HTML and CSS
app.use(express.static(path.join(__dirname, "../views")));

// Serve static files from 'public' for JS and other assets
app.use(express.static(path.join(__dirname, "../public")));

// Optional: route specifically for admin.html or other HTML files if not linked via SPA
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});

// For all other routes not starting with /api, serve index.html (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
