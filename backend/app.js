const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTypeRoutes");
const jobRoute = require("./routes/jobsRoutes");

// Database connection
mongoose
  .connect(
    "mongodb+srv://rimzath123:rimzath123@mern-jobs-port.qlqf6.mongodb.net/?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit on failure
  });

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Logger for development environment
}

app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

// Add security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "https://www.gstatic.com/charts/loader.js"],
        "img-src": ["'self'", "https:", "data:"],
      },
    },
    crossOriginEmbedderPolicy: false, // If required for handling cross-origin resources
  })
);

// Routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobTypeRoute);
app.use("/api", jobRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error middleware
app.use(errorHandler);

// Server port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
