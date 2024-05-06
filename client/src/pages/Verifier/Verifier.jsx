import React, { useState, useEffect } from "react";
import QRious from "qrious";
import axios from "axios";
import io from "socket.io-client";
import "./style.css";
import { Web3 } from "web3";
import cochetVert from "../img/accept.png";
import croixRouge from "../img/refuse.png";

const contractProofABI = [
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_a",
        type: "uint256[]",
      },
      {
        internalType: "uint256[][]",
        name: "_b",
        type: "uint256[][]",
      },
      {
        internalType: "uint256[]",
        name: "_c",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_inputs",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getInputs",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProof",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "a",
            type: "uint256[]",
          },
          {
            internalType: "uint256[][]",
            name: "b",
            type: "uint256[][]",
          },
          {
            internalType: "uint256[]",
            name: "c",
            type: "uint256[]",
          },
        ],
        internalType: "struct ProofContract.Proof",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "inputs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_inputs",
        type: "uint256[]",
      },
    ],
    name: "setInputs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_a",
        type: "uint256[]",
      },
      {
        internalType: "uint256[][]",
        name: "_b",
        type: "uint256[][]",
      },
      {
        internalType: "uint256[]",
        name: "_c",
        type: "uint256[]",
      },
    ],
    name: "setProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractVerifABI = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_pA",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_pB",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pC",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pubSignals",
        type: "uint256[2]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/41236084bd704280905e270666af92ff`
  )
);

function Proof({ proof, isAdult, onVerifyAnother }) {
  return (
    <div>
      <h2>Verification :</h2>
      <div className="centered-image">
        {proof === "Adult" ? (
          <img src={cochetVert} alt="Accepted" />
        ) : (
          <img src={croixRouge} alt="Refused" />
        )}
      </div>
      <br />
      <h2>{proof}</h2>
      <br />
      <button onClick={onVerifyAnother}>Check Another Client</button>
    </div>
  );
}
function VerifierPage() {
  const [verifierId, setVerifierId] = useState("");
  const [proof, setProof] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [isAdult, setIsAdult] = useState(false);

  useEffect(() => {
    const fetchVerifier = async () => {
      const storedVerifierId = localStorage.getItem("verifierId");
      if (storedVerifierId) {
        try {
          const response = await axios.get(`/verifiers/${storedVerifierId}`);
          if (!response.data.exists) {
            setShowGenerateButton(true);
            localStorage.removeItem("verifierId");
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

    fetchVerifier(); // Call the function to fetch the verifier
  }, [verifierId]);

  useEffect(() => {
    if (verifierId) {
      const newSocket = io("https://identityguard.me");
      setSocket(newSocket);
      newSocket.emit("joinVerifier", verifierId);

      newSocket.on("proof", async (proofData) => {
        const contract = new web3.eth.Contract(contractProofABI, proofData);

        const proof = await contract.methods.getProof().call();

        const inputs = await contract.methods.getInputs().call();

        const address_verif = "0x1d50c589c9B16a8459fA3BCf278428991C8E7fDb";
        const contractVerif = new web3.eth.Contract(
          contractVerifABI,
          address_verif
        );

        //const verif = await contractVerif.methods.verifyProof(proofa, proofb, proofc, inputs).call();
        //console.log(verif);
        if (true) {
          if (inputs[0] == 1) {
            setProof("Adult");
            setIsAdult(true);
          } else {
            setIsAdult(false);
            setProof("Minor");
          }
        } else {
          console.log("the proof is not valid");
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
          "Error during the creation of the verifier object: " + response.status
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
    <div
      className="container bg-bodyColor custom-bg pt-26"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="content">Verify a client</h1>
      {proof ? (
        <Proof
          proof={proof}
          isAdult={isAdult}
          onVerifyAnother={handleVerifyAnother}
        />
      ) : (
        <>
          <p className="content">Identifier: {verifierId}</p>
          {showQR && <canvas id="qrcode"></canvas>}
          {!showQR && showGenerateButton && (
            <button
              onClick={handleGenerateVerifier}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded content"
            >
              Generate an identifier
            </button>
          )}
          {!showQR && !showGenerateButton && (
            <button
              onClick={handleShowQR}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded content"
            >
              Show QR Code
            </button>
          )}
          {showQR && (
            <button
              onClick={handleHideQR}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded content"
            >
              Clear QR Code
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default VerifierPage;
