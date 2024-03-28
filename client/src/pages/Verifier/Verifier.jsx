import React, { useState, useEffect } from "react";
import QRious from "qrious";
import axios from "axios";
import io from "socket.io-client";
import "./style.css";

function Proof({ proof, onVerifyAnother }) {
  return (
    <div>
      <h2>Preuve reçue :</h2>
      <p>{proof}</p>
      <button onClick={onVerifyAnother}>Vérifier un autre client</button>
    </div>
  );
}

function VerifierPage() {
  const [verifierId, setVerifierId] = useState("");
  const [proof, setProof] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  useEffect(() => {
    const storedVerifierId = localStorage.getItem("verifierId");
    if (storedVerifierId) {
      setVerifierId(storedVerifierId);
      setShowGenerateButton(false);
    } else {
      setShowGenerateButton(true); // Afficher le bouton générer
    }
  }, [verifierId]);

  useEffect(() => {
    if (verifierId) {
      const newSocket = io(import.meta.env.VITE_API_URL + import.meta.env.VITE_SOCKET_PORT);
      setSocket(newSocket);
      newSocket.emit("joinVerifier", verifierId);

      newSocket.on("proof", (proofData) => {
        setProof(proofData);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [verifierId]);

  useEffect(() => {
    if (showQR && verifierId) {
      generateQR(verifierId);
    }
  }, [showQR, verifierId]);

  const generateNewVerifier = async () => {
    try {
      const response = await axios.post("/verifiers");
      if (response.status === 201) {
        const verifierData = response.data;
        const newVerifierId = verifierData.verifierId;

        setVerifierId(newVerifierId);
        localStorage.setItem("verifierId", newVerifierId);
      } else {
        throw new Error(
          "Erreur lors de la création de l'objet vérificateur: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création du vérificateur:", error);
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

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleHideQR = () => {
    setShowQR(false);
  };

  const handleVerifyAnother = () => {
    setShowQR(false);
    setProof(null);
  };

  const handleGenerateVerifier = () => {
    generateNewVerifier();
    setShowGenerateButton(false); // Cacher le bouton générer une fois que l'identifiant est généré
  };

  return (
    <div className="container">
      <h1>Vérifier un client</h1>
      {proof ? (
        <Proof proof={proof} onVerifyAnother={handleVerifyAnother} />
      ) : (
        <>
          <p>Identifiant : {verifierId}</p>
          {showQR && <canvas id="qrcode"></canvas>}
          {!showQR && showGenerateButton && (
            <button onClick={handleGenerateVerifier}>Générer un identifiant</button>
          )}
          {!showQR && !showGenerateButton && (
            <button onClick={handleShowQR}>Afficher le QR Code</button>
          )}
          {showQR && (
            <button onClick={handleHideQR}>Effacer le QR Code</button>
          )}
        </>
      )}
    </div>
  );
}

export default VerifierPage;
