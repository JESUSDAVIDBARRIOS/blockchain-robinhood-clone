import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const styles = {
  wrapper: "flex justify-between p-5  hover:bg-[#30363B] duration-300",
  container: "flex flex-col text-white items-center justify-center",
  name: "font-bold",
  chart: "w-36 h-full",
  price: "flex flex-col text-white",
  percent: "text-green-400",
};

type Coin = {
  symbol: string;
  change: number;
};

interface HeaderProps {
  coin: Coin;
  price: number;
}

const Asset: FC<HeaderProps> = ({ coin, price }) => {
  
  const randomNumber = () => {
    let data: number[] = [];
    for (let i = 0; i < 9; i++) {
      let randomNum = Math.floor(Math.random() * 100);
      data = [...data, randomNum];
    }
    return data;
  };

  const setGraphColor = () => {
    if (coin.change < 0) {
      return "#ef4b09";
    } else {
      return "#00ff1a";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.name}>{coin.symbol}</div>
      </div>
      <div>
        <div className={styles.chart}>
          {/* <Line data={data} options={options} width={400} height={150} /> */}
        </div>
      </div>
      <div className={styles.price}>
        <div>{price}</div>
        <div
          className={styles.percent}
          style={{ color: coin.change < 0 ? "#ef4b09" : "green" }}
        >
          {coin.change}%
        </div>
      </div>
    </div>
  );
};

export default Asset;
