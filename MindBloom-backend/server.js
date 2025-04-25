const express = require("express");
const dotenv = require("dotenv"); // Load environment variables from .env file
const mongoose = require("mongoose");
const cors = require("cors"); // Enable Cross-Origin Resource Sharing (CORS)

dotenv.config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

// Middleware to handle large JSON/image payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/moods");
const chatRoutes = require('./routes/chat');
const postRoutes = require('./routes/posts');
const profileRoutes = require('./routes/Profile');

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("MindBloom is running...");
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
