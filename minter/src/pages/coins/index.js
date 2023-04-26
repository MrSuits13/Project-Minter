
import Button from "@mui/material/Button";
import TextField from "@mui/material/Textfield";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import * as React from "react";
import {useSate} from "react";
import { ethers } from "ethers";
const factoryAddress = "0xB5D37d23160D2852eB99e018E6AefEa1249Dbb29"
const factoryAbi = require("../../artifacts/contracts/CoinFactory/CoinFactory.json");
const coinAbi = require("../../artifacts/contracts/Coin/Coin.json");

export default function CreateCoin() {
  const [walletAddress, setwalletAddress] = useState("");

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  async function requestAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  }
  requestAccount();

  async function mintCoin(event) {
    event.preventDefault();
    if(typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryAbi.abi,
        signer
      );

      const tx = await factoryContract.createNewCoin(
        formData.name,
        formData.symbol
      );

      const receipt = await tx.wait();
      const newCoinAddress = receipt.events[0].args[0];
      const newCoinContract = new ethers.Contract(
        newCoinAddess,
        coinAbi.abi,
        signer
      );
      await newCoinContract.mint(formData.amount);
    }
  }

  return (
    <><Button variant="contained" color="primary" onClick={requestAccount}>
      {walletAddress ? "Connected!" : "Connect Wallet 🦊"}
    </Button>
    <Box
      components="form"
      onSubmit={mintCoin}
      sx={{
        maxWidth: "500px",
        mx: "auto",
      }}
    >
        <Typography variant="h4" align="center">
          Create a Coin
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }} />
          <TextField
            fullWidth
            name="symbol"
            label="Symbol"
            value={formData.symbol}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }} />
          <TextField
            fullWidth
            name="amount"
            label="Amount"
            value={formData.amount}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{ mb: 2 }} />
          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box></>
  );
}
