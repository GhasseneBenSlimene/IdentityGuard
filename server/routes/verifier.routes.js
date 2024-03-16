const express = require("express");
const verifierController = require("../controllers/verifier.controller");

const router = express.Router();

router.post("/", verifierController.createVerifier);
router.get("/:verifierId", verifierController.checkVerifierExistence);
router.delete("/:verifierId", verifierController.deleteVerifier);

module.exports = router;
