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
export default function coins() {
  const [walletAddress, setwalletAddress] = useState("");
  const [ownedTokens, setOwnedTokens] = useState([{}]);

  async function requestAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    }
  }
  requestAccount();

  async function getTokens()
  {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const factoryContract = new ethers.Contract(
            factoryAddress,
            factoryAbi.abi,
            signer
        );

       const tokenArr = factoryContract.getDeployedCoins()
       for(var i = 0; i < tokenArr.length; i++) {
        const coinContract = new ethers.Contract(
            tokenArr[i],
            coinAbi.abi,
            signer
        )
        if(walletAddress == "") {
            return;
        }
        const ownedAmount = (await coinContract.balanceOf(walletAddress)).Number();
        const coinName = coinContract.name()
        const coinSymbol = coinContract.symbol()
        if(ownedAmount > 0){
            const token = {
                name: coinName,
                symbol: coinSymbol,
                amount: ownedAmount

            }
        }
        setOwnedTokens((ownedTokens) => [...ownedTokwns, token])

       }
    }
  }

  return (
    <> 
        <Button variant="contained" color="primary" onClick={requestAccount}>
         {walletAddress ? "Connected!" : "Connect Wallet 🦊"}
        </Button>
    </>
  );
}
