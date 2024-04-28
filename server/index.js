const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketManager = require("./sockets/socketManager");
const { verifyRefusedSession } = require("./controllers/refusedController");

const { verifyAdminSession } = require("./controllers/adminController");
const { verifyAcceptedSession } = require("./controllers/verifier.controller");

const app = express();

// Middleware to log received requests
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request received at ${new Date().toISOString()}`
  );
  next();
});

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database not connected ", error));

// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN, // Specify your frontend's domain or use "*" with caution
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Convert email and name to lowercase
app.use(require("./middlewares/toLowerCase"));

// Routes
app.use("/api/", require("./routes/authRoutes"));
app.use("/api/verifiers", require("./routes/verifier.routes"));
app.use("/api/admin", verifyAdminSession, require("./routes/adminRoutes"));
app.use(
  "/api/refused",
  verifyRefusedSession,
  require("./routes/refusedRoutes")
);

// Error handling
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

// Start the server on the specified port
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

// Use socket manager
socketManager(io);

// Cleanup
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

function cleanup() {
  console.log("Cleaning up resources...");

  // Close server
  server.close(() => {
    console.log("Server closed");

    // Disconnect from database
    mongoose.connection.close(false, () => {
      console.log("MongoDb connection closed");
      process.exit(0);
    });
  });
}
