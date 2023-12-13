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
