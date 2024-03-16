const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/authController");

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/Profile", getProfile);
router.get("/logout", logoutUser);

module.exports = router;
