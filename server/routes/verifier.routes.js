const express = require("express");
const verifierController = require("../controllers/verifier.controller");

const router = express.Router();

router.post("/", verifierController.createVerifier);
router.get("/:verifierId", verifierController.checkVerifierExistence);
router.delete("/:verifierId", verifierController.deleteVerifier); // Ajoutez ":verifierId" pour accepter l'identifiant du vérificateur dans l'URL
    
module.exports = router;
