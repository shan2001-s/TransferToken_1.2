
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

import React, { useState,useEffect, useRef } from 'react';
import Web3 from 'web3';
import { contractAddress,contractAbi } from './abi';

export default function Form({ onTransfer, transfers }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transferInProgress, setTransferInProgress] = useState(false);

  const [isPending, setIsPending] = useState();
  const [successAlert,setSuccessAlert] = useState(false)
  const [errorAlert,setErrorAlert] = useState(false)

  const [aa, setAA] = useState();
  const [bb, setBB] = useState();
  const [updatedIsPending, setUpdatedIsPending] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      // Your logic here...

      // Example: Fetch data every 2 seconds
      const lengthFromLocalStorageA = Number(localStorage.getItem("length"));
      setAA(lengthFromLocalStorageA);

      const lengthFromLocalStorageB = Number(localStorage.getItem("storeTransferLength"));
      setBB(lengthFromLocalStorageB);

      if (lengthFromLocalStorageA == lengthFromLocalStorageB) {
        // Convert the stored value to a boolean and update the state
       setIsPending(true)
      } else {
        setIsPending(false);
      }
    };

    // Run fetchData initially
    fetchData();

    // Set up an interval to run fetchData every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval when the component is unmounted or dependencies change
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect once on mount

  useEffect(() => {
    console.log(updatedIsPending);
    console.log(aa, "ssssssssssssssssssssssssssssss");
    console.log(bb, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    // You can perform other actions based on the updatedIsPending value here
  }, [updatedIsPending]);

  // useEffect(() => {
  //   console.log(aa, "leange");

  //   const ss = localStorage.getItem("storeTransferLength");
  //   const pp = localStorage.getItem("pending");
  //   console.log(ss, "storeTransferLength");
  //   console.log(pp, "pending");
   

  //   if (aa === ss) {
  //     localStorage.setItem("pending", true);
  //     setIsPending(true);
  //   } else if (aa > ss) {
  //     localStorage.setItem("pending", false);
  //     setIsPending(false);
  //   }

  //   // Increment the counter every time isPending or aa changes
  //   changeCounter.current += 1;

  //   // Check if it's the second change
  //   if (changeCounter.current % 2 === 0) {
  //     // Your code to run every second time isPending or aa changes
  //     console.log("Running every second time isPending or aa changes");
  //   }

  // }, [isPending]);

  // Handle local storage changes
  const handleStorageChange = () => {
    const updatedIsPending = localStorage.getItem("pending") === "true";
    setIsPending(updatedIsPending);
  };


  // useEffect(() => {
  //   // Add event listener for local storage changes
  //  const updatedIsPending = localStorage.getItem("pending") === "true";

   
  // }, [isPending]); // The empty dependency array ensures that this effect runs only once on mount

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
         console.log("confirm",transfers);
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
     
      localStorage.setItem("storeTransferLength",transfers.length);
     
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
      localStorage.setItem("storeTransferLength",transfers.length);
      // Perform the token transfer
      const transaction = await contract.methods.transfer(checksumRecipient, amount).send({ from: window.ethereum.selectedAddress });
      setIsPending(false)
      console.log('Token transfer successful! Transaction Hash:', transaction.transactionHash);
      console.log('Token transfer successful!');

      setSuccessAlert(true);
setIsPending(false)

      if (onTransfer) {
        await onTransfer();
      }
      
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
  <div style={{ background:"white", }}>
    <Stack>
    <Box sx={{ width: '100%' }}>
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
         Transfer is SuccessFul
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
        User canceled Transfer Token
        </Alert>
      </Collapse>
    </Box>
    </Stack>
    <Stack direction="row" spacing={2}>
    <Box sx={{ '& > :not(style)': { m: 1 }, bgcolor: 'white', p: "5px",    }}>
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
  
   
  </div>
   
  );
}



//***********************************************************************************************
