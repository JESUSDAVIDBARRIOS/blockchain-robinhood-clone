import { createContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import {
  bicoinAbi,
  dogeAbi,
  usdcAbi,
  bitcoinAddress,
  dogeAddress,
  usdcAddress,
} from "../lib/constants";
import swapTokens from "../pages/api/swapToken";

export const RobinhoodContext = createContext();

export const RobinhoodProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formattedAccount, setFormattedAccount] = useState("");
  const [coinSelect, setCoinSelect] = useState("DOGE");
  const [toCoin, setToCoin] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");

  const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      const account = user.get("ethAddress");
      let formatAccount = account.slice(0, 4) + "..." + account.slice(-4);

      setFormattedAccount(formatAccount);
      setCurrentAccount(account);
      let currentBalance;
      const setCurrentBalance = async () => {
        currentBalance = await Moralis.Web3API.account.getNativeBalance({
          chain: "rinkeby",
          address: currentAccount
        });
      };
      
      let balanceToEth;
      try {
        setCurrentBalance();
        balanceToEth = Moralis.Units.FromWei(currentBalance.balance);
      }
      catch(error) {
        balanceToEth = 0;
      }
      const formattedBalance = parseFloat(balanceToEth).toFixed(3);
      setBalance(formattedBalance);
    }
  }, [isAuthenticated, enableWeb3, balance, currentAccount, Moralis, user]);

  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: currentAccount,
        }),
      });

      const data = await response.json();
    })();
  }, [currentAccount]);

  const getContractAddress = () => {
    if (coinSelect === "BTC") return bitcoinAddress;
    else if (coinSelect === "DOGE") return dogeAddress;
    else if (coinSelect === "USDC") return usdcAddress;
  };

  const getToAddress = () => {
    if (toCoin === "BTC") return bitcoinAddress;
    else if (toCoin === "DOGE") return dogeAddress;
    else if (toCoin === "USDC") return usdcAddress;
  };

  const getToAbi = () => {
    if (toCoin === "BTC") return bicoinAbi;
    else if (toCoin === "DOGE") return dogeAbi;
    else if (toCoin === "USDC") return usdcAbi;
  };

  const mint = async () => {
    try {
      if (!isAuthenticated) return;
      else {
        if (coinSelect === "ETH") {
          await Moralis.enableWeb3();
          const contractAddress = getToAddress();
          const contractAbi = getToAbi();

          let options = {
            contractAddress: contractAddress,
            functionName: "mint",
            abi: contractAbi,
            params: {
              to: currentAccount,
              amount: Moralis.Units.Token("50", "18")
            },
          };

          sendEth();
          const transaction = await Moralis.executeFunction(options);
          const receipt = await transaction.wait(4);
          saveTransaction(receipt.transactionHash, amount, receipt.to);
        }
        else {
          const receipt = swapTokens();
          saveTransaction(receipt.transactionHash, amount, receipt.to);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return;
      await Moralis.enableWeb3();

      if(coinSelect === toCoin) return;

      const fromOptions = {
        type: 'erc20',
        amount: Moralis.Units.Token(amount, '18'),
        receiver: getContractAddress(),
        contractAddress: getContractAddress()
      }

      const toMintOptions = {
        contractAddress: getToAddress(),
        function: 'mint',
        abi: getToAbi(),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, '18')
        }
      }

      let fromTransaction = await Moralis.transfer(fromOptions);
      let toMintTransaction = await Moralis.executeFunction(toMintOptions);
      let fromReceipt = await fromTransaction.wait();
      let toReceipt = await toMintTransaction.wait();
      console.log(fromReceipt);
      console.log(toReceipt);
      return toReceipt;
    }
    catch (error) {
      console.error(error.message);
    }
  }

  const sendEth = async () => {
    try {
      if (!isAuthenticated) return;

      const contractAddress = getToAddress();

      let options = {
        type: 'native',
        amount: Moralis.Units.ETH('0.01'),
        receiver: contractAddress
      }

      const transaction = await Moralis.transfer(options);
      const receipt = await transaction.wait();
      console.log(receipt);
      saveTransaction(receipt.transactionHash, '0.01', receipt.to);
    }
    catch (error) {
      console.error(error.message);
    }
  }

  const saveTransaction = async (txHash, amount, toAddress) => { 
    await fetch("/api/swapTokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        txHash: txHash,
        from: currentAccount,
        to: toAddress,
        amount: parseFloat(amount)
      })
    })
  }

  const connectWallet = () => {
    authenticate();
  };

  const signOut = () => {
    logout();
  };

  return (
    <RobinhoodContext.Provider
      value={{
        connectWallet,
        signOut,
        currentAccount,
        isAuthenticated,
        formattedAccount,
        setAmount,
        mint,
        setCoinSelect,
        coinSelect,
        balance,
        swapTokens,
        amount,
        toCoin,
        setToCoin,
      }}
    >
      {children}
    </RobinhoodContext.Provider>
  );
};
