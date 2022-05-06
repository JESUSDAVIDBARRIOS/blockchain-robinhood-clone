import React, { FC } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ],
  datasets: [
    {
      data: [40, 45, 40, 50, 70, 72, 50, 50, 55, 70],
      backgroundColor: "#00ff1a",
      borderColor: "#00ff1a",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const PortfolioChart: FC = () => {
  return <Line data={data} width={400} height={150} />;
};

export default PortfolioChart;
