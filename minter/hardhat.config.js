require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/009949405cb041409633f2ad8a5df88f",
      accounts: [
        "996c009f2847ebbe88b3a97531394b4efd3c5dd3f3b19d014ba7fe2042fb9ded",
      ],
    },
  },
  solidity: "0.8.18",
};
