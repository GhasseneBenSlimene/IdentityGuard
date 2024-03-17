const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  getUsersInfo,
} = require("../controllers/authController");

router.get("/", test);
router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/Profile", getProfile);
router.get("/logout", logoutUser);
router.get("/usersInfo", getUsersInfo);

module.exports = router;
