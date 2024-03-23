const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// log received requests
app.use((req, res, next) => {
  console.log(
    `A ${req.method} request recieved at ${new Date().toISOString()}`
  );
  next();
});

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database not connected ", error));

// middleware
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/verifiers", require("./routes/verifier.routes"));
app.use("/admin", require("./routes/adminRoutes"));

// error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
