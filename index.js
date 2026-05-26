// 🍥 Shinobi Technique Tracker — Main Gateway to the Hidden Leaf API
const express = require("express");
const techniqueRoutes = require("./routes/techniqueRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware — parse incoming JSON like reading a mission scroll
app.use(express.json());

// Routes — channel requests to the correct jutsu handler
app.use("/api/techniques", techniqueRoutes);

// 404 handler — for wandering ninja who lost their way
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler — the safety net no shinobi should be without
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server — open the village gates (only when run directly)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Shinobi Technique Tracker running on port ${PORT}`);
  });
}

module.exports = app;
