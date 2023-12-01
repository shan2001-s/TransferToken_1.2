
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// // export default function Form() {
// //   return (
// //     <Stack direction="row" spacing={2}>
// //     <Box sx={{ '& > :not(style)': { m: 1 }, bgcolor: 'white', p:"5px" }}>
// //       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
// //         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
// //         <TextField id="input-with-sx" label="Receipt Address" variant="standard" />

// //         {/* <AccountCircle sx={{ color: 'action.active',  mr: 1, my: 0.5 }} /> */}
// //         <TextField id="input-with-sx" label="Token Amount" type='number' variant="standard" sx={{pl:2}} />

        
// //       </Box>
// //       <Button variant="contained">Sent</Button>
// //     </Box>
// //     </Stack>
// //   );
// // }
// import React, { useState } from 'react';
// import Web3 from 'web3';

// export default function Form() {
//   const [recipient, setRecipient] = useState('');
//   const [amount, setAmount] = useState('');

//   const connectMetaMask = async () => {
//     try {
//       // Connect to MetaMask
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       console.log('Connected to MetaMask');
//     } catch (error) {
//       console.error('Error connecting to MetaMask:', error.message);
//     }
//   };

//   const initiateTokenTransfer = async () => {
//     try {
//       // Check if MetaMask is connected
//       if (typeof window.ethereum !== 'undefined') {
//         // Use web3.js to interact with the ERC-20 token contract
//         const web3 = new Web3(window.ethereum);

//         // Call functions to estimate gas and gas price before performing the actual token transfer
//         const { gasEstimation, gasPrice } = await estimateGasAndGasPrice(web3, recipient, amount);

//         // Display gas estimation and gas price to the user
//         console.log('Estimated Gas Cost:', gasEstimation);
//         console.log('Current Gas Price:', web3.utils.fromWei(gasPrice, 'gwei'), 'Gwei');

//         // Calculate estimated confirmation time based on gas price (adjust this calculation based on your preferences)
//         const estimatedConfirmationTime = Math.ceil(gasEstimation * gasPrice / 1e10); // Example calculation, adjust as needed

//         console.log('Estimated Confirmation Time:', estimatedConfirmationTime, 'seconds');

//         // Ask the user to confirm the transfer
//         const userConfirmation = window.confirm(`Estimated Gas Cost: ${gasEstimation}\nCurrent Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei\nEstimated Confirmation Time: ${estimatedConfirmationTime} seconds\n\nDo you want to proceed with the token transfer?`);

//         if (userConfirmation) {
//           // Call a function to perform the actual token transfer
//           await performTokenTransfer(web3, recipient, amount);
//           console.log('Token transfer successful!');
//         } else {
//           console.log('User canceled the transfer.');
//         }
//       } else {
//         console.log('MetaMask not connected. Please connect MetaMask first.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   const estimateGasAndGasPrice = async (web3, recipient, amount) => {
//     try {
//       // Validate the recipient address
//       if (!web3.utils.isAddress(recipient)) {
//         throw new Error('Invalid Ethereum address provided');
//       }

//       // Convert the recipient address to checksum format
//       const checksumRecipient = web3.utils.toChecksumAddress(String(recipient));

//       // Use web3.js to interact with the ERC-20 token contract
//       const contract = new web3.eth.Contract(contractAbi, contractAddress);

//       // Estimate gas for the token transfer
//       const gasEstimation = await contract.methods.transfer(checksumRecipient, amount).estimateGas({ from: window.ethereum.selectedAddress });

//       // Fetch current gas price from the Ethereum node
//       const gasPrice = await web3.eth.getGasPrice();

//       return { gasEstimation, gasPrice };
//     } catch (error) {
//       console.error('Error estimating gas and gas price:', error.message);
//       return { gasEstimation: null, gasPrice: null };
//     }
//   };

//   const performTokenTransfer = async (web3, recipient, amount) => {
//     try {
//       // Validate the recipient address
//       if (!web3.utils.isAddress(recipient)) {
//         throw new Error('Invalid Ethereum address provided');
//       }

//       // Convert the recipient address to checksum format
//       const checksumRecipient = web3.utils.toChecksumAddress(String(recipient));

//       // Use web3.js to interact with the ERC-20 token contract
//       const contract = new web3.eth.Contract(contractAbi, contractAddress);

//       // Perform the token transfer
//       await contract.methods.transfer(checksumRecipient, amount).send({ from: window.ethereum.selectedAddress });

//       console.log('Token transfer successful!');
//     } catch (error) {
//       console.error('Error performing token transfer:', error.message);
//     }
//   };

//   return (
//         <Stack direction="row" spacing={2}>
//     <Box sx={{ '& > :not(style)': { m: 1 }, bgcolor: 'white', p:"5px" }}>
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         <TextField id="input-with-sx" label="Receipt Address" variant="standard" value={recipient} onChange={(e) => setRecipient(e.target.value)} />

//         {/* <AccountCircle sx={{ color: 'action.active',  mr: 1, my: 0.5 }} /> */}
//         <TextField id="input-with-sx" label="Token Amount" type='number' variant="standard" sx={{pl:2}}  value={amount} onChange={(e) => setAmount(e.target.value)} />

        
//       </Box>
//       <Button onClick={initiateTokenTransfer} variant="contained"> Token Transfer</Button>
//     </Box>
//     </Stack>
   
//   );
// }

// const contractAddress = '0x0f8ed17f5c203d7497d255f073e09663cfbb5f5c'; // Replace with your contract address

// const contractAbi = [
    
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "to",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "value",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "transfer",
//             "outputs": [
//                 {
//                     "internalType": "bool",
//                     "name": "",
//                     "type": "bool"
//                 }
//             ],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "_name",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "_symbol",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "_totalSupply",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "from",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "to",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "value",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "Transfer",
//             "type": "event"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "name": "balanceOf",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "name",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "symbol",
//             "outputs": [
//                 {
//                     "internalType": "string",
//                     "name": "",
//                     "type": "string"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "totalSupply",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }

// ];

// ***********************************************************************************************

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function TokenTransfer() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load transaction history from local storage on component mount
    const storedHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const connectMetaMask = async () => {
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to MetaMask');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error.message);
    }
  };

  const initiateTokenTransfer = async () => {
    try {
      setStatus('pending');

      // Check if MetaMask is connected
      if (typeof window.ethereum !== 'undefined') {
        // Use web3.js to interact with the ERC-20 token contract
        const web3 = new Web3(window.ethereum);

        // Call functions to estimate gas and gas price before performing the actual token transfer
        const { gasEstimation, gasPrice } = await estimateGasAndGasPrice(web3, recipient, amount);

        // Display gas estimation and gas price to the user
        console.log('Estimated Gas Cost:', gasEstimation);
        console.log('Current Gas Price:', web3.utils.fromWei(gasPrice, 'gwei'), 'Gwei');

        // Calculate estimated confirmation time based on gas price (adjust this calculation based on your preferences)
        const estimatedConfirmationTime = Math.ceil(gasEstimation * gasPrice / 1e10); // Example calculation, adjust as needed

        console.log('Estimated Confirmation Time:', estimatedConfirmationTime, 'seconds');

        // Ask the user to confirm the transfer
        const userConfirmation = window.confirm(`Estimated Gas Cost: ${gasEstimation}\nCurrent Gas Price: ${web3.utils.fromWei(gasPrice, 'gwei')} Gwei\nEstimated Confirmation Time: ${estimatedConfirmationTime} seconds\n\nDo you want to proceed with the token transfer?`);

        if (userConfirmation) {
          // Call a function to perform the actual token transfer
          await performTokenTransfer(web3, recipient, amount);
          console.log('Token transfer successful!');

          // Update status to success
          setStatus('success');

          // Add the transaction to the history
          const transactionDetails = {
            date: new Date().toLocaleString(),
            from: window.ethereum.selectedAddress,
            to: recipient,
            amount: amount,
            status: 'Success',
          };

          // Update history state and store in local storage
          setHistory([...history, transactionDetails]);
          localStorage.setItem('transactionHistory', JSON.stringify([...history, transactionDetails]));

          // Clear the form
          setRecipient('');
          setAmount('');
        } else {
          console.log('User canceled the transfer.');
          // Update status to fail
          setStatus('fail');
        }
      } else {
        console.log('MetaMask not connected. Please connect MetaMask first.');
        // Update status to fail
        setStatus('fail');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Update status to fail
      setStatus('fail');
    }
  };

  const estimateGasAndGasPrice = async (web3, recipient, amount) => {
    try {
      // Validate the recipient address
      if (!web3.utils.isAddress(recipient)) {
        throw new Error('Invalid Ethereum address provided');
      }

      // Convert the recipient address to checksum format
      const checksumRecipient = web3.utils.toChecksumAddress(String(recipient));

      // Use web3.js to interact with the ERC-20 token contract
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Estimate gas for the token transfer
      const gasEstimation = await contract.methods.transfer(checksumRecipient, amount).estimateGas({ from: window.ethereum.selectedAddress });

      // Fetch current gas price from the Ethereum node
      const gasPrice = await web3.eth.getGasPrice();

      return { gasEstimation, gasPrice };
    } catch (error) {
      console.error('Error estimating gas and gas price:', error.message);
      return { gasEstimation: null, gasPrice: null };
    }
  };

  const performTokenTransfer = async (web3, recipient, amount) => {
    try {
      // Validate the recipient address
      if (!web3.utils.isAddress(recipient)) {
        throw new Error('Invalid Ethereum address provided');
      }

      // Convert the recipient address to checksum format
      const checksumRecipient = web3.utils.toChecksumAddress(String(recipient));

      // Use web3.js to interact with the ERC-20 token contract
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Perform the token transfer
      await contract.methods.transfer(checksumRecipient, amount).send({ from: window.ethereum.selectedAddress });

      console.log('Token transfer successful!');
    } catch (error) {
      console.error('Error performing token transfer:', error.message);
    }
  };

  return (
    <div>
      {/* Form */}
      <label>
        Recipient Address:
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </label>
      <br />
      <label>
        Token Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <br />
      <button onClick={initiateTokenTransfer}>Initiate Token Transfer</button>
      <br />
      <button onClick={connectMetaMask}>Connect MetaMask</button>

      {/* Transaction Status Card */}
      {status && (
        <Card>
          <CardContent>
            <h3>Status: {status}</h3>
            {/* Add other transaction details here */}
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <h2>Transaction History</h2>
      {history.map((transaction, index) => (
        <Card key={index} style={{ marginTop: '10px' }}>
          <CardContent>
            <p>Date: {transaction.date}</p>
            <p>From: {transaction.from}</p>
            <p>To: {transaction.to}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const contractAddress = '0x0f8ed17f5c203d7497d255f073e09663cfbb5f5c'; // Replace with your contract address

const contractAbi = [
    
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

