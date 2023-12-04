import React from "react";
import { useState, useEffect } from "react";
import Web3 from 'web3';
import {
  useEthers,
  useEtherBalance,
  Mainnet,
  Rinkeby,
  Kovan,
  Ropsten,
  Goerli
} from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import "./Wallet.css";
import Form from "./Form";
import { contractAddress,contractAbi } from "./abi";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, Container, styled, Paper } from "@mui/material";
import { height } from "@mui/system";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CardMedia from "@mui/material/CardMedia";
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { CardActionArea } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Wallet() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [transfers, setTransfers] = useState([]);
  const address = '0xc258Ac72a022f45a99827506610Bf430C1709b98';
console.log(transfers);
  const web3 = new Web3('https://sepolia.infura.io/v3/699481de92e54cf98cf36242de4152e7');
  const tokenContract = new web3.eth.Contract(contractAbi, contractAddress);

  const getTokenTransfers = async () => {
    try {
      const events = await tokenContract.getPastEvents('Transfer', {
        filter: { from: address },
        fromBlock: 0,
        toBlock: 'latest',
      });

      // Fetch and attach block timestamps to each event
      const transfersWithTimestamps = await Promise.all(
        events.map(async (event) => {
          const block = await web3.eth.getBlock(event.blockNumber);
          return { ...event, timestamp: block.timestamp };
        })
      );

      setTransfers(transfersWithTimestamps.reverse());
    } catch (error) {
      console.error('Error fetching token transfers:', error);
    }
  };

  const initiateTransfer = async () => {
    try {
      // Your logic for initiating a transfer here

      // Fetch the updated transfer history after a successful transfer
      await getTokenTransfers();
    } catch (error) {
      console.error("Error initiating transfer:", error);
    }
  };

  useEffect(() => {
    getTokenTransfers();

    // Set up an interval to check for changes every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      getTokenTransfers();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      {account ? (
        <Container
          sx={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",

            color: "white",
            p: 2,
            borderStyle: "solid",
            borderColor: "#282c34 #e65100 #e65100 #282c34",
            borderWidth: "5px",
          }}
        >
          {/* Border box */}

          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              textAlign: "center",
            justifyContent: "center",
            alignItems: "center",

              width: "1000",
            
            }}
          >
            <Box
              className="disconnectCart"
              sx={{
                width: " 450px",
                height: 250,
               textAlign:'center',
                justify: "center",
                alignItems: "center",
               
              }}
            >
                <Box sx={{ 
             
               marginTop: '50px'}}>
               <AccountCircleIcon fontSize="large"/>
              {/* <p>Your Accout : {first4Str}xxxxxx{last4Str}</p> */}
              <p>your account : {account}</p>
                </Box>
            
                <div style={{ }}>
         <Form onTransfer={initiateTransfer} />
         </div>
            
            </Box>
           
          </Box>
       
          <Grid container spacing={2} sx={{marginTop: '100px'}}>
          {transfers.map((event, index) => (
      
           <Grid  key={index} className="card" item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  backgroundColor: "#424242",
                  color: "white",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h7"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                  {new Date(event.timestamp * 1000).toLocaleString()}
                  <Stack direction="row" spacing={1}>
    
                  <a href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}  target="_blank" rel="noopener noreferrer">
        <Chip label="View" color="primary" variant="outlined" />
      </a>
    </Stack>
                  </Typography>
                  <Typography  variant="body2">
                <br></br>
               {event.returnValues.to} <br></br>
                 {event.returnValues.value}  Token
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          /* <p>Transaction Hash: {event.transactionHash}</p>
          <p>From: {event.returnValues.from}</p>
          <p>To: {event.returnValues.to}</p>
          <p>Amount: {event.returnValues.value}</p>
          <p>Time: </p>
          <hr /> */
        
      ))}
          </Grid> 

         

      
  
  
          <Button
            sx={{
                marginTop: '20px',
              backgroundColor: "#e65100",
              "&:hover": {
                backgroundColor: "#e65100",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            variant="contained"
            size="medium"
            onClick={() => deactivate()}
          >
            Disconnect
          </Button>
          <Typography sx={{marginTop:"5px"}}>
         <WarningAmberIcon sx={{color:'yellow' }}/> Without Click <b> " Disconnect " </b> button ,<br></br>It can show directly <br></br>by changing Metamark Account .
          </Typography>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            color: "white",
          }}
        >
          <Box
            sx={{
              p: 5,
              border: "1px dashed grey",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Raleway",
                p: 2,
                borderStyle: "solid",
                borderColor: "#282c34 #e65100 #e65100 #282c34",
                borderWidth: "5px",
              }}
              variant="h3"
            >
              Welcome
            </Typography>
            <p>Please Connect your account</p>
            <br></br>
            <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <h2 id="parent-modal-title">Text in a modal</h2>
    <p id="parent-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </p>
    <Button
              sx={{
                backgroundColor: "#e65100",
                "&:hover": {
                  backgroundColor: "#e65100",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              variant="contained"
              size="medium"
              onClick={() => activateBrowserWallet()}
            >
              Connect
            </Button>
  </Box>
</Modal>
           
          </Box>
        </Container>
      )}
    </div>
  );
}

export default Wallet;
