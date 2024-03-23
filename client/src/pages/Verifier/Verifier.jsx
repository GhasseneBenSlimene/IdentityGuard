import React, { useState, useEffect } from "react";
import QRious from "qrious";
import "./style.css";

function VerifierPage() {
  const [verifierId, setVerifierId] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const storedVerifierId = localStorage.getItem("verifierId");
      const storedExpiration = localStorage.getItem("expiration");

      if (storedVerifierId && storedExpiration) {
        const expirationDate = new Date(storedExpiration);
        const currentDate = new Date();

        if (currentDate < expirationDate) {
          // Le vérificateur n'est pas expiré, afficher l'identifiant et générer le QR code
          setVerifierId(storedVerifierId);
          generateQR(storedVerifierId);
        } else {
          // Le vérificateur est expiré, afficher le message d'expiration et effacer le QR code
          setVerifierId("Identifiant expiré, veuillez en créer un nouveau");
          generateQR(null);
        }
      }
    }, 1000); // Vérifier toutes les secondes

    return () => clearInterval(interval);
  }, []);

  const generateNewVerifier = async () => {
    try {
      // Supprimer l'ancien vérificateur
      await removeVerifier();

      // Créer un nouveau vérificateur
      const response = await fetch("http://localhost:5000/verifiers", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création de l'objet vérificateur: " +
            response.status
        );
      }
      const verifierData = await response.json();
      const newVerifierId = verifierData.verifierId;
      const expiration = verifierData.expiration;

      setVerifierId(newVerifierId);
      localStorage.setItem("verifierId", newVerifierId);
      localStorage.setItem("expiration", expiration);

      // Générer le QR code
      generateQR(newVerifierId);
    } catch (error) {
      console.error("Erreur lors de la création du vérificateur:", error);
    }
  };

  const removeVerifier = async () => {
    try {
      const verifierId = localStorage.getItem("verifierId");
      if (verifierId) {
        localStorage.removeItem("verifierId");
        await deleteVerifierDB(verifierId);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du vérificateur:", error);
    }
  };

  const deleteVerifierDB = async (verifierId) => {
    try {
      await fetch(`http://localhost:5000/verifiers/${verifierId}`, {
        method: "DELETE",
      });
      console.log("delete envoyé");
    } catch (error) {
      console.error("Erreur lors de la suppression du vérificateur:", error);
    }
  };

  const generateQR = (verifierId) => {
    try {
      var qrCodeCanvas = document.getElementById("qrcode");
      new QRious({
        element: qrCodeCanvas,
        value: verifierId,
        size: 300,
      });
    } catch (error) {
      console.error("Erreur lors de la génération du QR code:", error);
    }
  };

  return (
    <div className="container">
      <h1>Générateur de QR Code</h1>
      <p id="verifierId">Identifiant du vérificateur : {verifierId}</p>
      <canvas id="qrcode"></canvas>
      <button onClick={generateNewVerifier}>Générer un nouveau QR Code</button>
    </div>
  );
}

export default VerifierPage;
