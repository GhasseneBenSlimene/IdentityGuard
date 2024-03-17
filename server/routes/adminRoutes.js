const express = require("express");
const router = express.Router();
const { upload, dir } = require("../config/multerConfig");
const {
  getUsersInfo,
  verifyAdminSession,
} = require("../controllers/adminController");

//admin
router.get("/usersInfo", getUsersInfo);
// router.get("/uploads", verifyAdminSession, express.static("../uploads"));
router.get("/uploads", express.static(dir));

module.exports = router;
