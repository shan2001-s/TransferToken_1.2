export const contractAddress = '0x0f8ed17f5c203d7497d255f073e09663cfbb5f5c'; // Replace with your contract address

export const contractAbi = [
   
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "to",
                   "type": "address"
               },
               {
                   "internalType": "uint256",
                   "name": "value",
                   "type": "uint256"
               }
           ],
           "name": "transfer",
           "outputs": [
               {
                   "internalType": "bool",
                   "name": "",
                   "type": "bool"
               }
           ],
           "stateMutability": "nonpayable",
           "type": "function"
       },
       {
           "inputs": [
               {
                   "internalType": "string",
                   "name": "_name",
                   "type": "string"
               },
               {
                   "internalType": "string",
                   "name": "_symbol",
                   "type": "string"
               },
               {
                   "internalType": "uint256",
                   "name": "_totalSupply",
                   "type": "uint256"
               }
           ],
           "stateMutability": "nonpayable",
           "type": "constructor"
       },
       {
           "anonymous": false,
           "inputs": [
               {
                   "indexed": true,
                   "internalType": "address",
                   "name": "from",
                   "type": "address"
               },
               {
                   "indexed": true,
                   "internalType": "address",
                   "name": "to",
                   "type": "address"
               },
               {
                   "indexed": false,
                   "internalType": "uint256",
                   "name": "value",
                   "type": "uint256"
               }
           ],
           "name": "Transfer",
           "type": "event"
       },
       {
           "inputs": [
               {
                   "internalType": "address",
                   "name": "",
                   "type": "address"
               }
           ],
           "name": "balanceOf",
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
           "inputs": [],
           "name": "name",
           "outputs": [
               {
                   "internalType": "string",
                   "name": "",
                   "type": "string"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [],
           "name": "symbol",
           "outputs": [
               {
                   "internalType": "string",
                   "name": "",
                   "type": "string"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       },
       {
           "inputs": [],
           "name": "totalSupply",
           "outputs": [
               {
                   "internalType": "uint256",
                   "name": "",
                   "type": "uint256"
               }
           ],
           "stateMutability": "view",
           "type": "function"
       }

];