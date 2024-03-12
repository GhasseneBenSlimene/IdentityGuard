const Verifier = require("../models/verifier.model");

exports.createVerifier = async (req, res) => {
  try {
      const createdAt = new Date();
      const expiration = new Date(createdAt.getTime() + 20 * 1000); // Ajoute 3600 secondes (en millisecondes) à la date de création
      const verifier = await Verifier.create({ createdAt });
      res.status(201).json({ verifierId: verifier.verifierId, expiration });
  } catch (error) {
      console.error("Erreur lors de la création du vérificateur :", error);
      res.status(500).json({ message: "Erreur lors de la création du vérificateur" });
  }
};

exports.checkVerifierExistence = async (req, res) => {
    try {
        const verifierId = req.params.verifierId;
        const verifier = await Verifier.findOne({ verifierId });
        if (!verifier) {
            return res.status(200).json({ exists: false });
        }
        return res.status(200).json({ exists: true });
    } catch (error) {
        console.error("Erreur lors de la vérification de l'existence du vérificateur :", error);
        res.status(500).json({ message: "Erreur lors de la vérification de l'existence du vérificateur" });
    }
};

exports.deleteVerifier = async (req, res) => {
  console.log("delete reçu");
  const verifierId = req.params.verifierId;
  try {
    await Verifier.findOneAndDelete({ verifierId: verifierId });
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du vérificateur:", error);
    res.status(500).json({ error: "Erreur lors de la suppression du vérificateur" });
  }
};
