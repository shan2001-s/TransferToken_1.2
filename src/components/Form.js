
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

import React, { useState,useEffect } from 'react';
import Web3 from 'web3';

export default function Form() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transferInProgress, setTransferInProgress] = useState(false);
  const initialIsPending = localStorage.getItem("pending") === "true";
  const [isPending, setIsPending] = useState(initialIsPending);
  const [successAlert,setSuccessAlert] = useState(false)
  const [errorAlert,setErrorAlert] = useState(false)


  useEffect(() => {
    // Save the current value to local storage whenever it changes
    localStorage.setItem("pending", isPending.toString());
  }, [isPending]);

  // Handle local storage changes
  const handleStorageChange = () => {
    const updatedIsPending = localStorage.getItem("pending") === "true";
    setIsPending(updatedIsPending);
  };

  useEffect(() => {
    // Add event listener for local storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // The empty dependency array ensures that this effect runs only once on mount

console.log(isPending,"ppp");

  const initiateTokenTransfer = async () => {

    setErrorAlert(false);
    setSuccessAlert(false)
    try {
      setTransferInProgress(true); // Set transfer in progress to true

     
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
      
        Swal.fire({
          title: "Do you want to proceed with the token transfer?",
          html: `<p style="text-align: left;">Estimated Gas Cost:<b> ${gasEstimation}</b></p>
          <p style="text-align: left;">Current Gas Price: <b>${web3.utils.fromWei(gasPrice, 'gwei')}</b> Gwei</p>
          <p style="text-align: left;">Estimated Confirmation Time: <b> ${estimatedConfirmationTime} </b>seconds</p>
          `,
           icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, transfer"
        }).then((result) => {
          if (result.isConfirmed) {
         
              // Call a function to perform the actual token transfer
               performTokenTransfer(web3, recipient, amount);
             
            } else {
              console.log('User canceled the transfer.');
            
          }
        });
      
  
    }
    } catch (error) {
      console.error('Error:', error.message);
      // Show an alert for errors
      window.alert('Error: ' + error.message);
    } finally {
      setTransferInProgress(false); // Reset transfer in progress to false
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
      console.log(checksumRecipient);
     
      // Use web3.js to interact with the ERC-20 oken contract
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
     
      setIsPending(true)
      // Perform the token transfer
      const transaction = await contract.methods.transfer(checksumRecipient, amount).send({ from: window.ethereum.selectedAddress });
      setIsPending(false)
      console.log('Token transfer successful! Transaction Hash:', transaction.transactionHash);
      console.log('Token transfer successful!');
      setSuccessAlert(true);
      
    } catch (error) {
    
      setIsPending(false)
      // Check if the user canceled the transaction
      if (error.message.includes('User denied transaction signature')) {
        // User canceled the transaction
        console.warn('User canceled the transfer.');
        // You can show an alert or handle it in any other way you prefer
       setErrorAlert(true)
      } else {
        // Other errors
        console.error('Error performing token transfer:', error.message);
        // You can show an alert or handle the error as needed
        window.alert('Error performing token transfer: ' + error.message);
      }
    }
  };
   
 
  return (
  <>
    <Stack direction="row" spacing={2}>
    <Box sx={{ '& > :not(style)': { m: 1 }, bgcolor: 'white', p: "5px" }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Receipt Address" variant="standard" value={recipient} onChange={(e) => setRecipient(e.target.value)} />

        <TextField id="input-with-sx" label="Token Amount" type='number' variant="standard" sx={{ pl: 2 }} value={amount} onChange={(e) => setAmount(e.target.value)} />

      </Box>
    
        {  isPending ? 
          <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined">
        Pending
      </LoadingButton> :  
       <Button  onClick={initiateTokenTransfer} variant="contained" >Transfer  </Button>
       }
   
    
    </Box>
  
  </Stack>
  <Box sx={{ width: '50%' }}>
      <Collapse in={successAlert}>
        <Alert severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
      <Collapse in={errorAlert}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setErrorAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
    </Box>
   
  </>
   
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

//***********************************************************************************************
