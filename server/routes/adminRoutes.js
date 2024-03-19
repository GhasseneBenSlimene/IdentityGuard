const express = require("express");
const router = express.Router();
const { dir } = require("../config/multerConfig");
const {
  getUsersInfo,
  verifyAdminSession,
  acceptUser,
} = require("../controllers/adminController");

//admin
router.get("/usersInfo", getUsersInfo);
router.use("/uploads", verifyAdminSession, express.static(dir));
router.post("/accept", acceptUser);

module.exports = router;
