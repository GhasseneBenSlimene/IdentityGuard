const Verifier = require("../models/verifier.model");

exports.createVerifier = async (req, res) => {
  try {
      const verifier = await Verifier.create();
      res.status(201).json({ verifierId: verifier.verifierId});
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


exports.sendUserDataToVerifier = async (req, res) => {
  try {
      // Logique pour envoyer les données utilisateur au vérificateur
  } catch (error) {
      console.error("Erreur lors de l'envoi des données utilisateur au vérificateur :", error);
      res.status(500).json({ message: "Erreur lors de l'envoi des données utilisateur au vérificateur" });
  }
};
