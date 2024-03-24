import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import jsQR from "jsqr";
import axios from "axios";
import io from "socket.io-client";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [scannedQrCode, setScannedQrCode] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showAgeProofOptions, setShowAgeProofOptions] = useState(false);
  const [isVideoCaptured, setIsVideoCaptured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const videoRef = useRef(null);

  const handleProofOfAge = () => {
    setShowAgeProofOptions(true);
  };

  const handleSaveIdentifier = async () => {
    if (socket && identifier) {
      try {
        const response = await axios.get(`/verifiers/${identifier}`);
        const exists = response.data.exists;
        if (exists) {
          const data = {
            identifier: identifier,
            email: user.email,
          };
          socket.emit("message", data);
          console.log("envoyé");
          setErrorMessage("Données envoyées");
          stopVideoCapture(); // Arrêtez la capture vidéo ici
        } else {
          setErrorMessage("Identifiant incorrect, veuillez recommencer");
        }
      } catch (error) {
        // Gérer les erreurs de la requête Axios
        console.error("Erreur lors de la requête Axios :", error);
      }
    } else if (!identifier) {
      console.log("pas d'identifiant");
    }
  };

  useEffect(() => {
    if (scannedQrCode && method === "camera") {
      setIdentifier(scannedQrCode);
    }

    return () => {
      stopVideoCapture();
    };

  }, [scannedQrCode, method]);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_API_URL + import.meta.env.VITE_SOCKET_PORT
    );
    setSocket(newSocket);

    newSocket.on("error_message", (message) => {
      setErrorMessage(message);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isCameraAvailable && method === "camera") {
      const videoElement = videoRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      videoElement.addEventListener("play", () => {
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute("willReadFrequently", "false");
        const scanFrame = () => {
          context.drawImage(videoElement, 0, 0, width, height);
          const imageData = context.getImageData(0, 0, width, height);
          decodeQRCode(imageData, width, height);
          if (!isVideoCaptured) {
            requestAnimationFrame(scanFrame);
          }
        };
        scanFrame();
      });

      function decodeQRCode(imageData, width, height) {
        const code = jsQR(imageData.data, width, height);
        if (code) {
          console.log("QR Code détecté :", code.data);
          setScannedQrCode(code.data);
        }
      }

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          videoElement.srcObject = stream;
        })
        .catch(function (error) {
          console.error("Erreur lors de l'accès à la caméra :", error);
          setIsCameraAvailable(false);
        });
    }
  }, [isCameraAvailable, method]);

  function stopVideoCapture() {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      setIsVideoCaptured(true);
      const tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
      videoElement.srcObject = null;
    }
  }
  

  return (
    <div className="container">
      <h1>Welcome to your dashboard, {user && user.name}</h1>
      {!showAgeProofOptions && (
        <button onClick={handleProofOfAge}>Prouver mon âge</button>
      )}
      {showAgeProofOptions && (
        <>
          <div className="button-group">
            <button
              onClick={() => {
                setMethod("camera");
                setIsCameraAvailable(true);
                setScannedQrCode("");
                setIsVideoCaptured(false);
              }}
            >
              Scanner le QR code
            </button>
            <button
              onClick={() => {
                setMethod("input");
              }}
            >
              Entrer le QR code
            </button>
          </div>
          <div id="message" className="error-message">
            <p>{errorMessage}</p>
          </div>
        </>
      )}
      {method === "input" && (
        <div className="input-container">
          <div className="input-group">
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Entrer l'identifiant"
              className="identifier-input"
            />
            {identifier && method === "input" && (
              <button onClick={handleSaveIdentifier} className="send-button">
                Envoyer
              </button>
            )}
          </div>
        </div>
      )}
      {method === "camera" && scannedQrCode && (
        <button onClick={handleSaveIdentifier} className="send-button">
          Envoyer
        </button>
      )}
      {!isCameraAvailable && method === "camera" && (
        <p className="error-message">
          Veuillez autoriser l'accès à la caméra ou choisir une autre méthode.
        </p>
      )}
      {isCameraAvailable && method === "camera" && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay></video>
        </div>
      )}
      {method === "camera" && scannedQrCode && (
        <p>QR Code scanné : {scannedQrCode}</p>
      )}
    </div>
  );
}
