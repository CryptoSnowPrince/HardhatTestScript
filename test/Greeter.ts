import { expect } from "chai";
import hre, { ethers } from "hardhat";

import { Greeter } from "../typechain"
import greeterAbi from "../artifacts/contracts/Greeter.sol/Greeter.json"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers";

let accountList: SignerWithAddress[];
// let greeter: Contract;
let greeterContract: Contract;

before(async function () {
  // await hre.network.provider.send("hardhat_reset");

  // await hre.network.provider.request(
  //   {
  //     method: "hardhat_reset",
  //     params: []
  //   }
  // );

  accountList = await ethers.getSigners();
  const provider = ethers.provider
  // console.log(greeterAbi.abi);
  greeterContract = new ethers.Contract("0x37fCd222F5D0D7FE6C6d1fD6DEDE22Eb1553D32C", greeterAbi.abi, this.provider)
  // console.log(greeterContract);
  //0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3
  //0x10ED43C718714eb63d5aA57B78B54704E256024E
  //0x28B7f6F38AbeBBBAAC23D94aD0F4D1ab8329651A
  // this.router = new ethers.Contract('0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3', ['function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)', 'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)', 'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)', 'function swapExactTokensForETHSupportingFeeOnTransferTokens( uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external'], this.provider)

  console.log("provider")
  // console.log(this.router)
  // console.log(provider)
  console.log("accountList")
  // console.log(accountList)
  console.log(accountList.length)
  for (let i = 0; i < accountList.length; i++)
      console.log("## ", accountList[i].address);
})

describe("Greeter Test", function () {

  // let greeter: Greeter

  // this.beforeAll(async function () {
  //   console.log("beforeAll");
  // })

  // beforeEach(async function () {
  //   console.log("beforeEach1");
  // })

  // beforeEach(async function () {
  //   console.log("beforeEach2");
  // })

  // before(async function () {
  //   console.log("Greeter.ts test script");
  //   this.Greeter = await ethers.getContractFactory("Greeter");
  //   greeter = await this.Greeter.deploy("Hello, world!", 0);
  //   await greeter.deployed();

  //   console.log("Greeter deployed to:", greeter.address);

  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //   expect(await greeter.testVal()).to.equal(0);


  // })

  it("Should return the new greeting once it's changed", async function () {
    console.log("New Testing");

    const setGreetingTx = await greeterContract.connect(accountList[0]).setGreeting("Hola, new1!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeterContract.connect(accountList[0]).greet()).to.equal("Hola, new1!");
  });

  it("Should revert with revert string", async function () {
    const testVal = await greeterContract.connect(accountList[0]).testVal();

    console.log("testVal: ", testVal);

    await expect(greeterContract.connect(accountList[0]).setVal(10)).to.revertedWith('Same Value');
  });

  
  it("Should emit LogSetVal once it's changed", async function () {
    await expect(greeterContract.connect(accountList[0]).setVal(11)).to.emit(greeterContract, "LogSetVal").withArgs(accountList[0].address, 11);

    expect(await greeterContract.connect(accountList[0]).testVal()).to.equal(11);
  });


  // it("Should return the new greeting once it's changed", async function () {

  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();

  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  // it("Should emit LogSetVal once it's changed", async function () {
  //   // const setValTx = await greeter.setVal(10);

  //   // await setValTx.wait();

  //   await expect(greeter.setVal(10)).to.emit(greeter, "LogSetVal").withArgs(accountList[0].address, 10);

  //   expect(await greeter.testVal()).to.equal(10);
  // });

  // it("Should revert with revert string", async function () {
  //   const testVal = await greeter.testVal();

  //   console.log("testVal: ", testVal);

  //   // await expect(greeter.setVal(10)).to.be.revertedWith('Same Value'); 
  //   await expect(greeter.setVal(10)).to.revertedWith('Same Value');
  // });

});
