import axios from 'axios';
import { useContext, useState } from 'react';
import { RobinhoodContext } from '../context/RobinhoodContext';

// Types
import { Coin }  from "../types/Coin";

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
    "flex flex-col bg-[#1E2123] mt-6 rounded-lg overflow-y-scroll noScroll lg:flex-1 xl:flex-1 2xl:flex-1 h-fit",
  rightMainItem: "flex items-center text-white p-5 border-b border-[#30363b]",
  ItemTitle: "flex-1 font-bold",
  moreOptions: "cursor-pointer text-xl",
};

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

const Home = ({coins}) => {

  const [ myCoins ] = useState([...coins.slice(0,6)]);
  const { balance } = useContext(RobinhoodContext);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.leftMain}>
          <div className={styles.portfolioAmountContainer}>
            <div className={styles.portfolioAmount}>{balance} ETH</div>
            <div className={styles.portfolioPercent}>
              - 0.044 (+0.320%)
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
            <div className={styles.buyingPowerAmount}>{balance} ETH</div>
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
          {myCoins.map(token => {
            let price = parseFloat(token.price).toFixed(2);
            return (
              <Asset
              key={token.uuid}
              coin={token}
              price={price}
            />
            )
          })}

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

export const getStaticProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      tiers: '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '10',
      offset: '0',
    },
    headers: {
      'X-RapidAPI-Host': process.env.COIN_RANKING_HOST,
      'X-RapidAPI-Key': process.env.COIN_RANKING_KEY,
    },
  }

  const res = await axios.request(options);
  const coins = res.data.data.coins;

  return {
    props: { coins },
  }
}