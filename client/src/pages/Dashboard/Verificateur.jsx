import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Web3 from "web3";
import * as snarkjs from 'snarkjs';

export default function Verificateur() {

  const [contractAddress, setContractAddress] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [randomNumber, setRandomNumber] = useState(null);

    useEffect(() => {
        // Générer un nombre aléatoire lors du montage du composant
        const random = Math.floor(Math.random() * 10000) + 1;
        setRandomNumber(random);
    }, []);
    const verifyData = async () => {
    
        const web3 = new Web3("http://localhost:8545"); 

      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "proofA",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "proofB",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "proofC",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "pubSignals",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[2]",
              "name": "_proofA",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2][2]",
              "name": "_proofB",
              "type": "uint256[2][2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "_proofC",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "_pubSignals",
              "type": "uint256[2]"
            }
          ],
          "name": "updateProof",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getProof",
          "outputs": [
            {
              "internalType": "uint256[2]",
              "name": "",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2][2]",
              "name": "",
              "type": "uint256[2][2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "",
              "type": "uint256[2]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_code",
              "type": "uint256"
            }
          ],
          "name": "setVerificationCode",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_code",
              "type": "uint256"
            }
          ],
          "name": "verifyCode",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[2]",
              "name": "_pA",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2][2]",
              "name": "_pB",
              "type": "uint256[2][2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "_pC",
              "type": "uint256[2]"
            },
            {
              "internalType": "uint256[2]",
              "name": "_pubSignals",
              "type": "uint256[2]"
            }
          ],
          "name": "verifyProof",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]; 


    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {

        const proof = await contract.methods.getProof().call({});
          // Access the individual elements of the tuple
          const pA = proof[0];
          const pB = proof[1];
          const pC = proof[2];
          const pbSignals = proof[3];
      
          const test = await contract.methods.verifyProof(pA, pB, pC, pbSignals).call({});
          console.log(pbSignals);

      if (test) {
        const code = await contract.methods.verifyCode(randomNumber).call();;
        if(code){
            const result = JSON.stringify(pbSignals).includes('0');
            console.log(result);
            setVerificationResult(`La vérification est ${!result}`);
        } else {
            setVerificationResult('La code est incorrect');
        }
      } else {
        setVerificationResult('La preuve est incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification :', error);
    }

  };

  const setCode = () => {
    // Implémentez votre logique pour modifier le code du contrat ici
  };

  return (
    <div>
      <h1>Vérificateur</h1>

      <div id="RandomNum">{randomNumber}</div>

      <label htmlFor="contractAddress">Adresse du Contrat :</label>
      <input
        type="text"
        id="contractAddress"
        placeholder="Adresse du Contrat"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <br />

      <button onClick={verifyData}>Vérifier</button>

      <div id="verificationResult">{verificationResult}</div>
    </div>
  );
}