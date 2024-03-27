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

async function call_proof(address) {

    const contract = new web3.eth.Contract(contractProofAge.abi, address);

    const accounts = await web3.eth.getAccounts();
    const accountNumber = accounts[0];



    const proof = await contract.methods.getProof().call();

    const inputs = await contract.methods.getInputs().call();

    console.log(proof);
    console.log(inputs);
    return 1;
}

module.exports = deploy_proof;
