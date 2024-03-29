const express = require("express");
const router = express.Router();
const {
  sendReason,
  verifyRefusedSession,
} = require("../controllers/refusedController");

router.post("/getReason", verifyRefusedSession, sendReason);

module.exports = router;
