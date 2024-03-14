import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import Web3 from "web3";
import * as snarkjs from 'snarkjs';

export default function Prouveur() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <h1>Loading...</h1>;
  console.log(`Dashboard data: ${!!user}`);

  if (!user) return <div>Please log in.</div>;

  const [accountNumber, setAccountNumber] = useState('');
  const [age, setAge] = useState('');
  const [securityNumber, setSecurityNumber] = useState('');
  const [contractAddress, setContractAddress] = useState('');
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

  const deployContract = async() => {
    try {
      
      const contractBytecode = "0x608060405234801561001057600080fd5b50611039806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806384812550116100665780638481255014610135578063b4da21c914610165578063bc1b849814610181578063bca39599146101b1578063f5c9d69e146101e157610093565b806324ffa172146100985780634e21577f146100c85780635c5d625e146100f85780636ecca5b714610119575b600080fd5b6100b260048036038101906100ad9190610c81565b610211565b6040516100bf9190610eaa565b60405180910390f35b6100e260048036038101906100dd9190610c81565b61022c565b6040516100ef9190610eaa565b60405180910390f35b610100610247565b6040516101109493929190610e48565b60405180910390f35b610133600480360381019061012e9190610c81565b6103b1565b005b61014f600480360381019061014a9190610c81565b6103bb565b60405161015c9190610eaa565b60405180910390f35b61017f600480360381019061017a9190610c1c565b6103d6565b005b61019b60048036038101906101969190610c81565b610424565b6040516101a89190610e8f565b60405180910390f35b6101cb60048036038101906101c69190610caa565b610432565b6040516101d89190610eaa565b60405180910390f35b6101fb60048036038101906101f69190610bb7565b610460565b6040516102089190610e8f565b60405180910390f35b6008816002811061022157600080fd5b016000915090505481565b6006816002811061023c57600080fd5b016000915090505481565b61024f610924565b610257610946565b61025f610924565b610267610924565b6000600260066008836002806020026040519081016040528092919082600280156102a7576020028201915b815481526020019060010190808311610293575b5050505050935082600280602002604051908101604052809291906000905b8282101561031f5783826002020160028060200260405190810160405280929190826002801561030b576020028201915b8154815260200190600101908083116102f7575b5050505050815260200190600101906102c6565b5050505092508160028060200260405190810160405280929190826002801561035d576020028201915b815481526020019060010190808311610349575b505050505091508060028060200260405190810160405280929190826002801561039c576020028201915b815481526020019060010190808311610388575b50505050509050935093509350935090919293565b80600a8190555050565b600081600281106103cb57600080fd5b016000915090505481565b8360009060026103e7929190610973565b508260029060026103f99291906109b3565b5081600690600261040b929190610973565b5080600890600261041d929190610973565b5050505050565b6000600a5482149050919050565b6002826002811061044257600080fd5b60020201816002811061045457600080fd5b01600091509150505481565b60006108db565b7f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd478110610498576000805260206000f35b50565b600060405183815284602082015285604082015260408160608360076107d05a03fa9150816104ce576000805260206000f35b825160408201526020830151606082015260408360808360066107d05a03fa9150816104fe576000805260206000f35b505050505050565b600060808601600087017f24b39187b522368f4ac46cf7997b1a3a1d326535961a7d99cfea3d3551acb8fc81527f1700c135a4a4e654854d9ccebf8c02865c69617f239fc97e576b3a60b7c40cbd60208201526105a960008801357f1d1819e7ca5bb9d0a560bd1e87e8d0c2544c7c59a3b5b4245d40789fda5435b77f1e1e246c42681fee714d623f5ca4241897d1784d4f97a18db0dd4b72344e18c88461049b565b6105f960208801357f10fcf8e161bf5eecfb21489f7e8afbee8851a32fdbe55247d2e7885b8da2fe8b7f0518f16dff8c85c1b90c95f38b975cd97829d7127cfbe7fe42b389db4f6820518461049b565b833582527f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4760208501357f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd4703066020830152843560408301526020850135606083015260408501356080830152606085013560a08301527f255b557061c059930079d874ab5503d8231b50e04a5017b7d3d0cc50dbf3652c60c08301527f286e4781ca0dab2915c76c68991e8c334385452fb54708adbf19ba7172fbbb9060e08301527e9a304852d995113f256e8f2da7adf3e34009a9620be2b3d79662d4197bbbf26101008301527f055ff5a049dab758fd11fc4737391c2035ed0b611ad64f1b1d4a395ee8c8eb476101208301527f0cc325dd37be68a55cfa7a44967b6131ac4f65a1bfae40487b58f5544987542f6101408301527f07fb20e7c222b0e9ed7774dc721c5e36c47e1d01e43964c5db592c230f73b271610160830152600088015161018083015260206000018801516101a08301527f198e9393920d483a7260bfb731fb5d25f1aa493335a9e71297e485b7aef312c26101c08301527f1800deef121f1e76426a00665e5c4479674322d4f75edadd46debd5cd992f6ed6101e08301527f090689d0585ff075ec9e99ad690c3395bc4b313370b38ef355acdadcd122975b6102008301527f12c85ea5db8c6deb4aab71808dcb408fe3d1e7690c43d37b4ce6cc0166fa7daa610220830152853561024083015260208601356102608301527ee8eac7ec6e7f6932531c6f973d1f569f4931d03dbad013c0b9f363759088166102808301527f2e878925ed15af66ed37ff149896443c2d909971e1a356f6f7c0287ab8263d566102a08301527f05a0aebaa8e2f6fe9a9afa9ac40649ed29ed4e07447a9892a814a10ba0f0ddbc6102c08301527f1da2a88404c7213e4872e95e65f29a03fd832feb74a55dc011843f0700a0dbbb6102e08301526020826103008460086107d05a03fa82518116935050505095945050505050565b60405161038081016040526108f36000840135610467565b6109006020840135610467565b61090d6040840135610467565b61091a818486888a610506565b8060005260206000f35b6040518060400160405280600290602082028036833780820191505090505090565b60405180604001604052806002905b61095d610924565b8152602001906001900390816109555790505090565b82600281019282156109a2579160200282015b828111156109a1578251825591602001919060010190610986565b5b5090506109af9190610a03565b5090565b826002800281019282156109f2579160200282015b828111156109f1578251829060026109e1929190610973565b50916020019190600201906109c8565b5b5090506109ff9190610a20565b5090565b5b80821115610a1c576000816000905550600101610a04565b5090565b5b80821115610a405760008181610a379190610a44565b50600201610a21565b5090565b506000815560010160009055565b6000610a65610a6084610ef6565b610ec5565b90508082856040860282011115610a7b57600080fd5b60005b85811015610aab5781610a918882610b7b565b845260208401935060408301925050600181019050610a7e565b5050509392505050565b6000610ac8610ac384610f1c565b610ec5565b90508082856020860282011115610ade57600080fd5b60005b85811015610b0e5781610af48882610ba2565b845260208401935060208301925050600181019050610ae1565b5050509392505050565b600081905082604060020282011115610b3057600080fd5b92915050565b600082601f830112610b4757600080fd5b6002610b54848285610a52565b91505092915050565b600081905082602060020282011115610b7557600080fd5b92915050565b600082601f830112610b8c57600080fd5b6002610b99848285610ab5565b91505092915050565b600081359050610bb181610fec565b92915050565b6000806000806101408587031215610bce57600080fd5b6000610bdc87828801610b5d565b9450506040610bed87828801610b18565b93505060c0610bfe87828801610b5d565b925050610100610c1087828801610b5d565b91505092959194509250565b6000806000806101408587031215610c3357600080fd5b6000610c4187828801610b7b565b9450506040610c5287828801610b36565b93505060c0610c6387828801610b7b565b925050610100610c7587828801610b7b565b91505092959194509250565b600060208284031215610c9357600080fd5b6000610ca184828501610ba2565b91505092915050565b60008060408385031215610cbd57600080fd5b6000610ccb85828601610ba2565b9250506020610cdc85828601610ba2565b9150509250929050565b6000610cf28383610d6d565b60408301905092915050565b6000610d0a8383610e2a565b60208301905092915050565b610d1f81610f56565b610d298184610f86565b9250610d3482610f42565b8060005b83811015610d65578151610d4c8782610ce6565b9650610d5783610f6c565b925050600181019050610d38565b505050505050565b610d7681610f61565b610d808184610f91565b9250610d8b82610f4c565b8060005b83811015610dbc578151610da38782610cfe565b9650610dae83610f79565b925050600181019050610d8f565b505050505050565b610dcd81610f61565b610dd78184610f9c565b9250610de282610f4c565b8060005b83811015610e13578151610dfa8782610cfe565b9650610e0583610f79565b925050600181019050610de6565b505050505050565b610e2481610fa7565b82525050565b610e3381610fb3565b82525050565b610e4281610fb3565b82525050565b600061014082019050610e5e6000830187610dc4565b610e6b6040830186610d16565b610e7860c0830185610dc4565b610e86610100830184610dc4565b95945050505050565b6000602082019050610ea46000830184610e1b565b92915050565b6000602082019050610ebf6000830184610e39565b92915050565b6000604051905081810181811067ffffffffffffffff82111715610eec57610eeb610fbd565b5b8060405250919050565b600067ffffffffffffffff821115610f1157610f10610fbd565b5b602082029050919050565b600067ffffffffffffffff821115610f3757610f36610fbd565b5b602082029050919050565b6000819050919050565b6000819050919050565b600060029050919050565b600060029050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b600081905092915050565b60008115159050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610ff581610fb3565b811461100057600080fd5b5056fea26469706673582212208c1e59422313eb61a69e4621b22f88e0871ad6acea5eb7f34032f972176c300d64736f6c63430008000033"; 

      const contract = new web3.eth.Contract(contractABI);

      // Déployer le contrat
      const deployedContract = await contract.deploy({
        data: contractBytecode,
      }).send({
        from: accountNumber,
        gas: '4700000',
      });

      setContractAddress(deployedContract.options.address);

      // Generate Groth16 proof
      const { proof, publicSignals } = await snarkjs.groth16.fullProve({ "age": age, "rand": "1" }, "/circuit.wasm", "/circuit_final.zkey");

      const proofA = [proof.pi_a[0], proof.pi_a[1]];
      const proofB = [
        [proof.pi_b[0][1], proof.pi_b[0][0]],
        [proof.pi_b[1][1], proof.pi_b[1][0]],
      ];
      const proofC = [proof.pi_c[0], proof.pi_c[1]];

      // Call the verification function on the smart contract
      await deployedContract.methods.updateProof(proofA, proofB, proofC, publicSignals).send({
        from: accountNumber,
        gas: '4700000', // Adjust the gas limit as needed
      });

      // Modifier le code de sécurité
      await deployedContract.methods.setVerificationCode(securityNumber).send({
        from: accountNumber,
      });

      console.log("Contrat déployé et modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors du déploiement du contrat :", error);
    }
  };

  const setCode = async() => {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.setVerificationCode(securityNumber).send({
        from: accountNumber,
    });
  };

  return (
    <div>
      <h1>Prouveur Page</h1>
      <form id="deploymentForm">
        <label htmlFor="accountNumber">Numéro de Compte :</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
        />
        <br />
        <label htmlFor="age">Âge :</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br />
        <label htmlFor="securityNumber">Numéro de Sécurité :</label>
        <input
          type="text"
          id="securityNumber"
          value={securityNumber}
          onChange={(e) => setSecurityNumber(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={deployContract}>
          Déployer le Contrat
        </button>
        <button type="button" onClick={setCode}>
          Modifier Code
        </button>
        <div id="AddressContract">{contractAddress}</div>
      </form>
    </div>
  );
}