import React from "react";
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


  const mainnetBalance = useEtherBalance(account, { chainId: Mainnet.chainId });
  const RinkebyBalance = useEtherBalance(account, { chainId: Rinkeby.chainId });
  const KovanBalance = useEtherBalance(account, { chainId: Kovan.chainId });
  const RopstenBalance = useEtherBalance(account, { chainId: Ropsten.chainId });
  const GoerliBalance = useEtherBalance(account, { chainId: Goerli.chainId });
  //const zkSyncBalance = useEtherBalance(account, { chainId: ZkSyncTestnet.chainId })

 // const last4Str = String(account).slice(-4);
//   const first4Str = account.substring(0, 6);

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
            
           
            
            </Box>
          </Box>
          <Form />
          <Grid container spacing={2} sx={{marginTop: '20px'}}>
          <Grid item xs={12} sm={6} lg={4}>
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
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                    }}
                  >
                    Mainnet
                  </Typography>
                  <Typography variant="h6">
                  {mainnetBalance && formatEther(mainnetBalance)} <br></br>
                    ETH
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
      
            <Grid item xs={12} sm={6} lg={4}>
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
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                    }}
                  >
                    Rinkeby
                  </Typography>
                  <Typography variant="h6">
                    {RinkebyBalance && formatEther(RinkebyBalance)} <br></br>
                    ETH
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                    }}
                  >
                    Kovan
                  </Typography>
                  <Typography variant="h6">
                  {KovanBalance && formatEther(KovanBalance)} <br></br>
                    ETH
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                    }}
                  >
                    Ropsten
                  </Typography>
                  <Typography variant="h6">
                    {RopstenBalance && formatEther(RopstenBalance)} <br></br>
                    ETH
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
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
                    variant="h5"
                    component="div"
                    sx={{
                      p: 2,

                      borderStyle: "solid",
                      borderColor: "#424242 #424242 #e65100 #424242",
                      borderWidth: "5px",
                    }}
                  >
                    Goerli
                  </Typography>
                  <Typography variant="h6">
                    {GoerliBalance && formatEther(GoerliBalance)} <br></br>
                    ETH
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
