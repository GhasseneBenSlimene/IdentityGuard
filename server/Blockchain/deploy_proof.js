// deploy_proof.js
const {Web3} = require('web3');


const contractProofAge = require('./build/contracts/ProofContract.json');

const web3 = new Web3("http://localhost:8545");

async function deploy_proof(proof, inputs) {

    const contract = new web3.eth.Contract(contractProofAge.abi);

    const accounts = await web3.eth.getAccounts();
    const accountNumber = accounts[0];

    const proofa = [proof.pi_a[0], proof.pi_a[1]];
    const proofc = [proof.pi_c[0], proof.pi_c[1]];
    const proofb = [[proof.pi_b[0][1], proof.pi_b[0][0]], [proof.pi_b[1][1], proof.pi_b[1][0]]];


    const deployedContract = await contract.deploy({
        data: contractProofAge.bytecode,
        arguments: [proofa, proofb, proofc, inputs],
        }).send({
        from: accountNumber,
        gas: '4700000',
        gasPrice: 1000000
    });

    console.log(deployedContract.options.address);
    return deployedContract.options.address;
}

module.exports = deploy_proof;
