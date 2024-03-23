const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const difference = Date.now() - birthDate.getTime();
  const ageDate = new Date(difference);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function ZKP(dob) {
  const age = calculateAge(dob);
  const zokratesFileContent = `
def main(private field age) -> field{
    assert(age >= 18);
    return 1;
}`;

  const projectDir = `zokrates_proof_${new Date()
    .toISOString()
    .slice(0, 19)
    .replace(/[-:T]/g, "")}`;
  const zokratesFilePath = path.join(projectDir, "age.zok");
  const dockerCommand = `
    docker run -v ${process.cwd()}/${projectDir}:/home/zokrates/code zokrates/zokrates /bin/bash -c "
        cd code
        zokrates compile -i age.zok
        zokrates setup
        zokrates compute-witness -a ${age}
        zokrates generate-proof
        zokrates export-verifier
    "`;

  // Create project directory and age.zok file
  fs.mkdirSync(projectDir);
  fs.writeFileSync(zokratesFilePath, zokratesFileContent);

  // Execute ZoKrates inside Docker
  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Assuming the process completes successfully, read and return the contents of proof.json and verifier.sol
    const proofPath = path.join(projectDir, "proof.json");
    const verifierPath = path.join(projectDir, "verifier.sol");

    const proof = fs.readFileSync(proofPath, "utf8");
    const verifier = fs.readFileSync(verifierPath, "utf8");

    console.log("Proof and Verifier have been generated.");
    // You can now use the proof and verifier strings as needed
    // For demonstration, we're just logging the first 100 characters of each
    console.log(`Proof (first 100 chars): ${proof.substring(0, 100)}`);
    console.log(`Verifier (first 100 chars): ${verifier.substring(0, 100)}`);
  });
}

// Usage
module.exports = ZKP;
