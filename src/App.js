import logo from './logo.svg';
//import './App.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import Wallet from './components/Wallet';

import { DAppProvider,Rinkeby, Mainnet, Kovan,  Ropsten,Goerli, useEtherBalance } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

import Button from '@mui/material/Button';

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
    networks: [Rinkeby,Kovan, Ropsten,Goerli,Mainnet],
 
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
    
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/969d43ff196f4b9c8649bd3e7e4a1e96',
      [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/969d43ff196f4b9c8649bd3e7e4a1e96',
      [Kovan.chainId]:'https://kovan.infura.io/v3/969d43ff196f4b9c8649bd3e7e4a1e96',
      [Ropsten.chainId]:'https://ropsten.infura.io/v3/969d43ff196f4b9c8649bd3e7e4a1e96',
      [Goerli.chainId]:'https://goerli.infura.io/v3/969d43ff196f4b9c8649bd3e7e4a1e96'
    },
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
