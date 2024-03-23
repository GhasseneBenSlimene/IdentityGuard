const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  deploy_contract,
} = require("../controllers/contractController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


router.post("/deploy_contract", deploy_contract);


module.exports = router;