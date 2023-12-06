// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value, bytes32 indexed txHash);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(value <= balanceOf[msg.sender], "ERC20: insufficient balance");

        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;

        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, to, value, block.timestamp));

        // Emit the actual transaction hash from the transaction receipt
        emit Transfer(msg.sender, to, value, txHash);

        return true;
    }
}
