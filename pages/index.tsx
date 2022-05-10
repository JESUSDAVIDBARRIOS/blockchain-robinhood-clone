// Types
import type { NextPage } from "next";

// Components
import Header from "../components/Header";
import PortfolioChart from "../components/PortfolioChart";
import BuyTokens from "../components/BuyTokens";
import Notice from "../components/Notice";
import Asset from "../components/Asset";

// Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus, AiFillHeart } from "react-icons/ai";

const styles = {
  wrapper: "w-screen h-screen flex flex-col",
  mainContainer: "w-2/3 m-auto flex mt-16 flex-wrap mb-8 sm:justify-center",
  leftMain: "flex flex-col  p-6 overflow-y-scroll md:w-3/4 lg:w-3/4" ,
  portfolioAmountContainer: "flex flex-col ",
  portfolioAmount: "text-white text-4xl",
  portfolioPercent: "text-white font-bold text-sm",
  pastHour: "text-gray-400",
  chartContainer:
    "text-5xl flex justify-center w-full h-1/3 text-white mt-11 mb-11",
  buyingPowerContainer:
    "w-full border-t mb-12 border-b h-16 border-[#30363b] flex justify-between items-center p-4",
  buyingPowerTitle: "text-white font-bolder text-lg",
  buyingPowerAmount: "text-white font-bolder text-xl",
  notice: "flex border border-[#30363b] my-4 p-5 flex-col flex-1 rounded",
  noticeContainer: "flex-1",
  noticeTitle: "text-gray-500",
  noticeMessage: "text-white font-bold",
  noticeCTA: "font-bold text-green-500 cursor-pointer mt-5",
  rightMain:
    "flex flex-col bg-[#1E2123] mt-6 rounded-lg overflow-y-scroll noScroll h-3/5 lg:flex-1 xl:flex-1 2xl:flex-1 sm:h-fit",
  rightMainItem: "flex items-center text-white p-5 border-b border-[#30363b]",
  ItemTitle: "flex-1 font-bold",
  moreOptions: "cursor-pointer text-xl",
};

const tokens = ["ETH", "DOGE", "USDC", "DAI"];

const bigChartLabels = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Noz",
  "Dec",
  "Jan",
];

const bigChartData = [40, 45, 40, 50, 70, 72, 50, 50, 55, 70];

const Home: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}>
            <div className={styles.portfolioAmount}>0 ETH</div>
            <div className={styles.portfolioPercent}>
              + 0.044 (+0.044%)
              <span className={styles.pastHour}> Past Hour</span>
            </div>
          </div>
          <div>
            <div className={styles.chartContainer}>
              <PortfolioChart labels = {bigChartLabels} dataArray={bigChartData} />
            </div>
          </div>
          <div className={styles.buyingPowerContainer}>
            <div className={styles.buyingPowerTitle}>Buying power</div>
            <div className={styles.buyingPowerAmount}>12 ETH</div>
          </div>
          <div className={styles.notice}>
            <div className={styles.noticeContainer}>
              <div className={styles.noticeTitle}>Send Funds</div>
              <div className={styles.noticeMessage}>
                Transfer your funds here.
              </div>
              <BuyTokens />
            </div>
          </div>
          <Notice />
        </div>
        <div className={styles.rightMain}>
          <div className={styles.rightMainItem}>
            <div className={styles.ItemTitle}>Crypto Currencies</div>
            <BiDotsHorizontalRounded className={styles.moreOptions} />
          </div>
          {tokens.map((token) => (
            <Asset
              key={token}
              coin={{ symbol: token, change: 30 }}
              price={30}
            />
          ))}

          <div className={styles.rightMainItem}>
            <div className={styles.ItemTitle}>Lists</div>
            <AiOutlinePlus className={styles.moreOptions} />
          </div>
        </div>
      </div>
      <footer className="text-center text-white pb-5">Developed in 2022 with <AiFillHeart className="text-green-400 inline" /></footer>
    </div>
  );
};

export default Home;
