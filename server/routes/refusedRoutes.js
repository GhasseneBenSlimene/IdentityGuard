const express = require("express");
const router = express.Router();
const { upload } = require("../handlers/fileHandler");
const { sendReason } = require("../controllers/refusedController");

router.post("/getReason", sendReason);
router.post("/sendImage", upload.single("image"));

module.exports = router;
