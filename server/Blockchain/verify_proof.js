// verify_proof.js
const {Web3} = require('web3');

const contractVerifier = require('./build/contracts/Verifier.json');
const contractProofAge = require('./build/contracts/ProofContract.json');
const web3 = new Web3("http://localhost:8545");


async function verify_proof(address) {

    const contract = new web3.eth.Contract(contractProofAge.abi, address);


    //Stocker l'address de notre compte ethereum
    const accounts = await web3.eth.getAccounts();
    const accountNumber = accounts[0];

    const proof = await contract.methods.getProof().call();

    const inputs = await contract.methods.getInputs().call();

    const contractVerif = new web3.eth.Contract(contractVerifier.abi);

    const proofStruct = {
        a: proof.a,
        b: proof.b,
        c: proof.c
    };

    // Mettre dans une autre fonction pour deployer qu'une seul fois ce contract stocker l'address
    const ContractVerif = await contractVerif.deploy({
        data: contractVerifier.bytecode,
        }).send({
        from: accountNumber,
        gas: '4700000',
    });


    const verif = await ContractVerif.methods.verifyTx(proofStruct, inputs).call();
    return verif;
}

module.exports = verify_proof;