// verify_proof.js
require("dotenv").config();
const { Web3 } = require("web3");

const contractVerifier = require("./build/contracts/VerifierAge.json");
const contractProofAge = require("./build/contracts/ProofContract.json");
const web3 = new Web3(process.env.WEB3_PROVIDER);

async function verify_proof(address) {
  const contract = new web3.eth.Contract(contractProofAge.abi, address);

  //Stocker l'address de notre compte ethereum
  const accounts = await web3.eth.getAccounts();
  const accountNumber = accounts[0];

  const proof = await contract.methods.getProof().call();

  const inputs = await contract.methods.getInputs().call();

  const contractVerif = new web3.eth.Contract(contractVerifier.abi);

  // Mettre dans une autre fonction pour deployer qu'une seul fois ce contract stocker l'address
  const ContractVerif = await contractVerif
    .deploy({
      data: contractVerifier.bytecode,
    })
    .send({
      from: accountNumber,
      gas: "4700000",
      gasPrice: 1000000,
    });

  const verif = await ContractVerif.methods
    .verifyProof(proof.a, proof.b, proof.c, inputs)
    .call();
  return verif;
}

module.exports = verify_proof;
