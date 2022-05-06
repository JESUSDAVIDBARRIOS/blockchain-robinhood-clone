import { makePublicRouterInstance } from "next/router";
import { monitorEventLoopDelay } from "perf_hooks";
import React, { FC } from "react";

const styles = {
  inputAmount: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  formContainer: `flex items-center`,
  select: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-transparent mt-6 text-white placeholder:text-white`,
  options: `w-1/2 flex items-center justify-center border border-white rounded-lg p-2 bg-black mt-6 text-white placeholder:text-white`,
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
};

const BuyTokens: FC = () => {
  const tokens = ["ETH", "DOGE", "USDC", "DAI"];
  return (
    <form className={styles.formContainer}>
      <div className="flex h-full w-full flex-col items-center">
        <select className={styles.select}>
          {tokens.map((token) => <option className={styles.options} key={token} value={token}>{token}</option>)}
        </select>
        <input 
        placeholder="Amount..."
        className={styles.inputAmount}
        type='number'
        />
        <button
            className={styles.noticeCTA}
            type="submit"
            // onClick={() => mint())}
        >Send</button>
      </div>
    </form>
  );
};

export default BuyTokens;
