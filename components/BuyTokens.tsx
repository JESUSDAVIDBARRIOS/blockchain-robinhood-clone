import { makePublicRouterInstance } from "next/router";
import { monitorEventLoopDelay } from "perf_hooks";
import { RobinhoodContext } from "../context/RobinhoodContext";
import React, { FC, useContext } from "react";

const styles = {
  inputAmount: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  formContainer: `flex items-center`,
  select: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
};

const BuyTokens: FC = () => {
  const {
    isAuthenticated,
    setAmount,
    mint,
    setCoinSelect,
    coinSelect,
    amount,
    toCoin,
    setToCoin,
  } = useContext(RobinhoodContext)
  const tokens = ["ETH", "DOGE", "USDC", "BTC"];
  const tokensToSwap = ["DOGE", "USDC", "BTC"];
  return (
    <form className={styles.formContainer}>
      <div className="flex h-full w-full flex-col items-center">
        <select className={styles.select} value={coinSelect} onChange={e => setCoinSelect(e.target.value)}>
          {tokens.map((token, i) => <option className={styles.options} key={i} value={token}>{token}</option>)}
        </select>
        <select className={styles.select} value={toCoin} onChange={e => setToCoin(e.target.value)}>
          {tokensToSwap.map((token, i) => <option className={styles.options} key={i} value={token}>{token}</option>)}
        </select>
        <input 
        placeholder="Amount..."
        className={styles.inputAmount}
        type='text'
        value={amount}
        onChange= {e => setAmount(e.target.value)}
        />
        <button
            className={styles.noticeCTA}
            type="button"
            disabled={!isAuthenticated}
            onClick={() => mint()}
        >Send</button>
      </div>
    </form>
  );
};

export default BuyTokens;
