import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const TokenDropdown = () => {
  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await axios.get(
          'https://tokens.coingecko.com/uniswap/all.json'
        );

        // Extract relevant data
        const tokens = response.data.tokens.map(token => ({
          value: token.address,
          label: `${token.name} (${token.symbol})`,
        }));

        setTokenList(tokens);
      } catch (error) {
        console.error('Error fetching token list:', error);
      }
    };

    fetchTokenList();
  }, []);

  const handleTokenChange = selectedOption => {
    setSelectedToken(selectedOption);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 180, // Set the width here
      backgroundColor: 'black', // Set the background color here
      borderRadius: 50, // Set the border-radius here
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white', // Set the text color here
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: 'black', // Set the background color here
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'gray' : 'black', // Set the hover color here
      ':active': {
        backgroundColor: 'gray', // Set the active color here
      },
    }),
  };
  
  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedToken}
        onChange={handleTokenChange}
        options={tokenList}
        placeholder="Select a token"
        styles={customStyles} // Apply the custom styles
      />
    </div>
  );
};

export default TokenDropdown;
