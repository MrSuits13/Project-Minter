// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = await Coin.deploy(
    "VikCoin",
    "VIK",
    "0x8D1B644340675dDbA8C720F8fDC7f11C957F0044"
  );

  await coin.deployed();

  const CoinFactory = await hre.ethers.getContractFactory("CoinFactory");
  const coinFactory = await CoinFactory.deploy();

  await coinFactory.deployed();

  console.log(
    "coin contract deployed at address " +
      coin.address + 
      " and CoinFactory deployed at address " +
      coinFactory.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
