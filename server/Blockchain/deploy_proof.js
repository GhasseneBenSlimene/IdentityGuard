// deploy_proof.js
const {Web3} = require('web3');


const contractProofAge = require('./build/contracts/ProofContract.json');

const web3 = new Web3("http://localhost:8545");

async function deploy_proof(proof, inputs) {

    const contract = new web3.eth.Contract(contractProofAge.abi);

    const accounts = await web3.eth.getAccounts();
    const accountNumber = accounts[0];



    const deployedContract = await contract.deploy({
        data: contractProofAge.bytecode,
        arguments: [proof.a, proof.b, proof.c, inputs],
        }).send({
        from: accountNumber,
        gas: '4700000',
    });

    console.log(deployedContract.options.address);
    return deployedContract.options.address;
}

module.exports = deploy_proof;
