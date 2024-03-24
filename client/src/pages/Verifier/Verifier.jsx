import React, { useState, useEffect } from "react";
import QRious from "qrious";
import "./style.css";
import axios from "axios";
import io from "socket.io-client";

function Proof({ proof }) {
  return (
    <div>
      <h2>Preuve reçue :</h2>
      <p>{proof}</p>
    </div>
  );
}

function VerifierPage() {
  const [verifierId, setVerifierId] = useState("");
  const [viewVerifierId, setViewVerifierId] = useState("Veuillez générer un nouvel identifiant.");
  const [socket, setSocket] = useState(null);
  const [expirationStatus, setExpirationStatus] = useState(false);
  const [previousVerifierId, setPreviousVerifierId] = useState(null);
  const [proof, setProof] = useState(null); // État pour stocker la preuve reçue

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
          setExpirationStatus(false);
        } else {
          // Le vérificateur est expiré, afficher le message d'expiration et effacer le QR code
          setVerifierId("");
          generateQR(null); // Supprimer le QR code
          setExpirationStatus(true);
          setViewVerifierId("Veuillez générer un nouvel identifiant.");
        }
      }
    }, 1000); // Vérifier toutes les secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!expirationStatus && verifierId) {
      // Connexion Socket.IO
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      newSocket.emit("joinVerifier", verifierId);
      console.log("rejoindre socket : " + verifierId);

      // Écouter l'événement 'proof' émis par le serveur et mettre à jour l'état de la preuve
      newSocket.on("proof", (email) => {
        console.log("Preuve reçue pour l'email :", email);
        setProof(email);
      });

      // Nettoyer la connexion lorsque le composant est démonté
      return () => newSocket.disconnect();
    }
  }, [verifierId, expirationStatus]);

  const generateNewVerifier = async () => {
    try {
      setProof(null);
      // Supprimer l'ancien vérificateur
      await removeVerifier();

      // Créer un nouveau vérificateur
      const response = await axios.post("/verifiers");
      if (response.status !== 201) {
        throw new Error(
          "Erreur lors de la création de l'objet vérificateur: " +
            response.status
        );
      }

      const verifierData = response.data;
      const newVerifierId = verifierData.verifierId;
      const expiration = verifierData.expiration;

      setVerifierId(newVerifierId);
      setViewVerifierId("Identifiant : " + newVerifierId);
      localStorage.setItem("verifierId", newVerifierId);
      localStorage.setItem("expiration", expiration);

      if (socket) {
        // Quitter la socket précédente si elle existe
        if (previousVerifierId) {
          socket.emit("quitVerifier", previousVerifierId);
          console.log("quitter socket : " + previousVerifierId);
        }
      }
      setPreviousVerifierId(newVerifierId);

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
      await axios.delete(`/verifiers/${verifierId}`);
      console.log("delete envoyé");
    } catch (error) {
      console.error("Erreur lors de la suppression du vérificateur:", error);
    }
  };

  const generateQR = (verifierId) => {
    try {
      var qrCodeCanvas = document.getElementById("qrcode");

      if (verifierId != null) {
        new QRious({
          element: qrCodeCanvas,
          value: verifierId,
          size: 300,
        });
      } else {
        // Si le vérificateur est expiré ou null, supprimer le QR code
        var context = qrCodeCanvas.getContext("2d");
        context.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);
      }
    } catch (error) {
      console.error("Erreur lors de la génération du QR code:", error);
    }
  };

  return (
    <div className="container">
      <h1>Générateur de QR Code</h1>
      <p id="verifierId">{viewVerifierId}</p>
      <canvas id="qrcode"></canvas>
      {proof && <Proof proof={proof} />} {/* Rendre le composant Proof si une preuve est reçue */}
      <button onClick={generateNewVerifier}>Générer un nouveau QR Code</button>
    </div>
  );
}

export default VerifierPage;