import React from "react";
import { useState, useEffect,useCallback } from "react";
import Web3 from 'web3';
import {
  useEthers,
 
} from "@usedapp/core";
import "./Wallet.css";
import Form from "./Form";
import { contractAddress,contractAbi } from "./abi";
import TokenList from './TokenList';

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, Container, styled, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CardMedia from "@mui/material/CardMedia";
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemIcon from '@mui/material/ListItemIcon';

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [currency, setCurrency] = useState('Dollar');

const handleChangeToken = (event) => {
  setCurrency(event.target.value);
};

  const handleClose = () => setOpen(false);

  const [transfers, setTransfers] = useState([]);
  const address = '0xc258Ac72a022f45a99827506610Bf430C1709b98';

  const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/DRadJNCZrs1cnwu8RejsUxpKVDD3Bp4Y');
  const tokenContract = new web3.eth.Contract(contractAbi, contractAddress);
console.log(transfers.length);
  const getTokenTransfers = useCallback(async () => {
    try {
      const events = await tokenContract.getPastEvents('Transfer', {
        filter: { from: address },
        fromBlock: 0,
        toBlock: 'latest',
      });
  
      const transfersWithTimestamps = await Promise.all(
        events.map(async (event) => {
          const block = await web3.eth.getBlock(event.blockNumber);
          return { ...event, timestamp: block.timestamp };
        })
      );
  
      setTransfers(transfersWithTimestamps.reverse());
    } catch (error) {
      if (error.message.includes('daily request count exceeded')) {
        console.error('Daily request limit exceeded. Consider upgrading your Infura plan.');
      } else {
        console.error('Error fetching token transfers:', error);
      }
    }
  }, [address, tokenContract]);
  
  const initiateTransfer = useCallback(async () => {
    try {
      // Your logic for initiating a transfer here
      await getTokenTransfers();
    } catch (error) {
      console.error("Error initiating transfer:", error);
    }
  }, [getTokenTransfers]);

  useEffect(() => {
    const fetchDataAndSetInterval = () => {
      getTokenTransfers();
      localStorage.setItem("length", transfers.length);
    };

    // Run fetchDataAndSetInterval initially
    fetchDataAndSetInterval();

    // Set up an interval to run fetchDataAndSetInterval every 2 seconds
    const intervalId = setInterval(fetchDataAndSetInterval, 2000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [getTokenTransfers, transfers]);

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
        <Box sx={{ display: "flex", justifyContent: "right"}}>
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
        </Box>

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
         {/* <Form onTransfer={initiateTransfer} transfers={transfers} /> */}
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
          {/* <Box
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
           
          </Box> */}

          {/* test for exchange price */}
          <Box
            sx={{
              p: 5,
              border: "1px dashed grey",
              background: "black"
            }}
          >
            {/* <Typography
              sx={{
                fontFamily: "Raleway",
                p: 2,
                borderStyle: "solid",
                borderColor: "#282c34 #e65100 #e65100 #282c34",
                borderWidth: "5px",
              }}
              variant="h3"
            >
           
            </Typography> */}


    


    <Grid container spacing={2}  style={{  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Grid item xs={5}  style={{}}>
  <TextField
      style={{ backgroundColor: '#424242', borderRadius: '10px' }}
      InputProps={{
        style: { color: 'white' },
        startAdornment: (
          <InputAdornment position="start">
            <Avatar
              alt="Logo"
              src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp"
              sx={{ width: 30, height: 30 }}
            />
          </InputAdornment>
        ),
      }}
      value={1}
    />
  </Grid>
  <Grid item xs={2}>
  <TrendingFlatIcon style={{color: "orange", width: "100px",  }}/>
  </Grid>
  <Grid item xs={5}>
  <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        style={{ backgroundColor: '#424242', borderRadius: '10px', flex: 1 }}
        InputProps={{
          style: { color: 'white' },
          endAdornment: (
            // <Select
            //   value={currency}
            //   onChange={handleChangeToken}
            //   variant="outlined"
            //   IconComponent={KeyboardArrowDownIcon}
            //   style={{
            //     color: 'white',
            //     border: '1px solid white',
            //     background: 'red',
            //     height: '40px',
            //     borderRadius: '50px',
               
            //   }}
            // >
            //    <MenuItem value="Dollar">
            //     <ListItemIcon>
            //       <Avatar
            //         alt="ETH Logo"
            //         src="https://logowik.com/content/uploads/images/ethereum-eth7803.logowik.com.webp"
            //         sx={{ width: 30, height: 30, marginRight: 2 }}
            //       />
            //     </ListItemIcon>
            //     ETH
            //   </MenuItem>
            //   <MenuItem value="Euro">Euro</MenuItem>
            // </Select>
            <TokenList />
          ),
        }}
        value={1}
      />

    </Stack>
  </Grid>
  
</Grid>
            </Box>

        </Container>


      )}
    </div>
  );
}

export default Wallet;
