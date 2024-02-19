const express = require("express");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database not connected ", error));

const app = express();

app.use((req, res, next) => {
  console.log(
    `A ${req.method} request recieved at ${new Date().toISOString()}`
  );
  next();
});

app.use("/", require("./routes/authRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
