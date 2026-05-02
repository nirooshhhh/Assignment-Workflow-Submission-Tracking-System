const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const logger = require("./middleware/logger");


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// use middleware
app.use(logger);

// Routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});