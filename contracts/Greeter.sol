// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    uint256 public testVal;

    event LogSetVal(address indexed from, uint256 val);

    constructor(string memory _greeting, uint256 _val) {
        console.log("Deploying a Greeter with greeting and testVal:", _greeting, _val);
        greeting = _greeting;
        testVal = _val;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function setVal(uint256 newVal) external {
        console.log("Changing testVal from '%d' to '%d'", testVal, newVal);
        require(testVal != newVal, "Same Value");
        testVal = newVal;

        emit LogSetVal(msg.sender, testVal);
    }
}
