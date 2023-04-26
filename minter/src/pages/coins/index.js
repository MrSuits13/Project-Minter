import Button from "@mui/material/Button";
import TextField from "@mui/material/Textfield";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import * as React from "react";
import {useSate} from "react";
import { ethers } from "ethers";
const factoryAddress = "0xB5D37d23160D2852eB99e018E6AefEa1249Dbb29"
const factoryAbi = require("../../../artifacts/contracts/CoinFactory/CoinFactory.json");
const coinAbi = require("../../../artifacts/contracts/Coin/Coin.json");
export default function CreateCoin() {
  const [walletAddress, setwalletAddress] = useState("");

  
  async function requestAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  }
  requestAccount();



  return (
    <> 
        <Button variant="contained" color="primary" onClick={requestAccount}>
         {walletAddress ? "Connected!" : "Connect Wallet 🦊"}
        </Button>

    </>
  );
}
