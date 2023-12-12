import logo from './logo.svg';
//import './App.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import Wallet from './components/Wallet';

import { DAppProvider,Rinkeby, Mainnet, Kovan,  Ropsten,Goerli, useEtherBalance } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

import Button from '@mui/material/Button';
import TokenList from './components/TokenList';

function App() {

  // const [account, setaccount] = useState();
  // const [balance, setbalance] = useState();
  // const [network, setnetwork] = useState()

  // useEffect(() => {

  //   let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  //   const loadAcc = async () => {

  //     const accounts = await web3.eth.requestAccounts();
  //     setaccount(accounts[0]);
  //   }

  //   const getBalance = async () => {
  //     const network = await web3.eth.net.getNetworkType(account);
  //     const balance = await web3.eth.getBalance(account);
  //     setbalance((balance / 1e18).toFixed(4))
  //     setnetwork(network)
  //   }

  //   loadAcc();
  //   getBalance();
  // }, [account])

  const config = {
 
  }

  return (
    <DAppProvider config={config}>
      <div className="App">
        <header className="App-header">
     
          <Wallet></Wallet>
          
         

        </header>
      </div>
    </DAppProvider>

  );
}

export default App;
