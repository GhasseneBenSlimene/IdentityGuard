const deploy_proof = require('./deploy_proof.js');
const call_proof = require('./deploy_proof.js');
const ZKP = require('../ZKP/generate_proof.js');

async function main() {
  const dob = '1990-01-01'; // Exemple de date de naissance
  try {
    const { proof, inputs} = await ZKP(dob);
    const address = await deploy_proof(proof, inputs);

    const verif = await call_proof(address);

    console.log(verif);
  } catch (error) {
    console.error('Erreur lors de la génération de la preuve :', error);
  }
}

main();