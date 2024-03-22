import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import jsQR from 'jsqr';
import axios from "axios";

import io from 'socket.io-client';

const socket = io('http://localhost:6000'); // l'URL du serveur

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [scannedQrCode, setScannedQrCode] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState(null);
  
  const handleProofOfAge = () => {
    // Demander l'accès à la caméra
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setIsCameraAvailable(true);
        setMethod('camera');
      })
      .catch(() => {
        setIsCameraAvailable(false);
        setMethod('input');
      });
  };

  const handleSaveIdentifier = async () => {
    localStorage.setItem('identifier', identifier);
    socket.emit('envoyerMessage',identifier);
    sendUserDataToVerifier(user.email, 123);
  };
  

  useEffect(() => {
    socket.on('recevoirMessage', identifier => {
      console.log('Message du serveur:', identifier);
    });
    if (isCameraAvailable) {
      // Initialiser la caméra et le scanner QR
      const videoElement = document.getElementById('camera');
      let isVideoCaptured = false;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      videoElement.addEventListener('play', () => {
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute('willReadFrequently', 'false');
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
          console.log('QR Code détecté :', code.data);
          setScannedQrCode(code.data);
          stopVideoCapture();
        }
      }
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          videoElement.srcObject = stream;
        })
        .catch(function(error) {
          console.error('Erreur lors de l\'accès à la caméra :', error);
        });

      function stopVideoCapture() {
        if (isVideoCaptured) return;
        isVideoCaptured = true;
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
          track.stop();
        });
        videoElement.srcObject = null;
      }
    }
  }, [isCameraAvailable]);


const sendUserDataToVerifier = async (data, verifierId) => {
  try {
    // Envoi des données à l'URL du vérificateur
    const response = await axios.post(`/verifiers/send-data/${verifierId}`, {
      data: data
    });

    // Vérifier la réponse et effectuer des actions en conséquence
    console.log('Réponse du vérificateur:', response.data);
    // Insérez ici toute logique supplémentaire en fonction de la réponse

  } catch (error) {
    console.error('Erreur lors de l\'envoi des données au vérificateur:', error);
  }

}



  return (
    <div>
      <h1>Welcome to your dashboard, {user && user.name}</h1>
      <button onClick={handleProofOfAge}>Prouver son âge</button>
      {isCameraAvailable && (
        <div>
          <h2>Scanner de QR Code</h2>
          <video id="camera" autoPlay></video>
        </div>
      )}
      {!isCameraAvailable && method === 'input' && (
        <div>
          <h2>Identifiant pour prouver l'âge</h2>
          <input 
            type="text" 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            placeholder="Entrer l'identifiant" 
          />
        </div>
      )}
      {method && (
        <button onClick={handleSaveIdentifier}>Envoyer</button>
      )}
      {scannedQrCode && <p>QR Code scanné : {scannedQrCode}</p>}
    </div>
  );
  
}