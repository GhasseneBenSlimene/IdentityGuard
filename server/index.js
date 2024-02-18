const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
