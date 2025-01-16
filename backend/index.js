const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
const uri =
  "mongodb+srv://rimzath123:rimzath123@mern-job-portal-app.pw7eg.mongodb.net/?retryWrites=true";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Define a simple route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
