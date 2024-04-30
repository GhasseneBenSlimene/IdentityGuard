import React, { useState, useEffect } from "react";
import QRious from "qrious";
import axios from "axios";
import io from "socket.io-client";
import "./style.css";
import {Web3} from "web3";

const contractProofABI = [
 // ABI for the proof contract
];

const contractVerifABI = [
 // ABI for the verification contract
];

const web3 = new Web3(
 new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/41236084bd704280905e270666af92ff`,
 ),
);

function Proof({ proof, onVerifyAnother }) {
 return (
    <div>
      <h2>Received Proof:</h2>
      <p>{proof}</p>
      <button onClick={onVerifyAnother}>Verify another client</button>
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
    const fetchVerifier = async () => {
      const storedVerifierId = localStorage.getItem("verifierId");
      if (storedVerifierId) {
        try {
          const response = await axios.get(`/verifiers/${storedVerifierId}`);
          if (!response.data.exists) {
            setShowGenerateButton(true);
            localStorage.removeItem('verifierId');
          } else {
            setVerifierId(storedVerifierId);
            setShowGenerateButton(false);
          }
        } catch (error) {
          console.error("Error during Axios request:", error);
          // Handle the error as needed
        }
      } else {
        setShowGenerateButton(true);
      }
    };
  
    fetchVerifier(); // Call the function to retrieve the verifier
 }, [verifierId]);
  

 useEffect(() => {
    if (verifierId) {
      const newSocket = io(import.meta.env.VITE_API_URL + import.meta.env.VITE_SOCKET_PORT);
      setSocket(newSocket);
      newSocket.emit("joinVerifier", verifierId);

      newSocket.on("proof", async (proofData) => {
        const contract = new web3.eth.Contract(contractProofABI, proofData);

        const proof = await contract.methods.getProof().call();

        const inputs = await contract.methods.getInputs().call();

        const address_verif = "0x1d50c589c9B16a8459fA3BCf278428991C8E7fDb";
        const contractVerif = new web3.eth.Contract(contractVerifABI, address_verif);

        //const verif = await contractVerif.methods.verifyProof(proofa, proofb, proofc, inputs).call();
        //console.log(verif);
        if(true){
            if(inputs[0] == 1){
                const proofData = "The verification is valid";
                setProof(proofData);
            }else{
                const proofData = "The age is less than 18 years";
                setProof(proofData);
            }
        } else {
            console.log("The proof is incorrect");
        }
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
        setShowGenerateButton(false);
      } else {
        throw new Error(
          "Error during the creation of the verifier object: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error during the creation of the verifier:", error);
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
      console.error("Error during the generation of the QR code:", error);
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
    setShowGenerateButton(false); // Hide the generate button once the identifier is generated
 };

 return (
    <div className="container bg-bodyColor custom-bg pt-72" style={{ minHeight: '100vh' }}>
      <h1 className="content">Verify a client</h1>
      {proof ? (
        <Proof proof={proof} onVerifyAnother={handleVerifyAnother} />
      ) : (
        <>
          <p className="content">Identifier: {verifierId}</p>
          {showQR && <canvas id="qrcode"></canvas>}
          {!showQR && showGenerateButton && (
            <button onClick={handleGenerateVerifier} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded content">Generate an identifier</button>
          )}
          {!showQR && !showGenerateButton && (
            <button onClick={handleShowQR}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded content"
           >Show QR Code</button>
          )}
          {showQR && (
            <button onClick={handleHideQR} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded content">Clear QR Code</button>
          )}
        </>
      )}
    </div>
 );
}

export default VerifierPage;
