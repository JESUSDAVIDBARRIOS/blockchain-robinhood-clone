import React, { FC, useContext } from "react";
import Image from "next/image";
import logo from "../assets/logoRobin.png";
import { AiOutlineSearch } from "react-icons/ai";
import { RobinhoodContext } from "../context/RobinhoodContext";

const styles = {
  container: "flex w-full h-16 bg-black px-16 py-3 mb-5 fixed",
  leftHeader: "flex w-4/12 md:w-2/12",
  logo: "object-cover cursor-pointer",
  searchWrapper: "flex w-8/12 md:w-4/12",
  searchInputContainer:
    "text-white items-center flex w-full border border-gray-400 hover:bg-[#1E2123] duration-300 p-3 rounded-lg",
  searchIcon: "text-gray-400 text-3xl mr-3",
  searchInputWrapper: "text-gray-400 text-lg w-full",
  searchInput: "bg-transparent outline-none w-full",
  rightHeader: "items-center justify-end text-white gap-8 hidden md:flex w-5/12 text-sm lg:text-base",
  menuItem: "cursor-pointer font-bold hover:text-green-500 duration-300",
};

const Header: FC = () => {
  const {
    connectWallet,
    signOut,
    currentAccount,
    isAuthenticated,
    formattedAccount,
  } = useContext(RobinhoodContext);

  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}>
        <Image
          src={logo}
          height={100}
          width={100}
          className={styles.logo}
          alt={"Logo"}
        />
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input placeholder="Search..." className={styles.searchInput} />
          </div>
        </div>
      </div>
      <div className={styles.rightHeader}>
        <div className={styles.menuItem}>Rewards</div>
        <div className={styles.menuItem}>Portfolio</div>
        <div className={styles.menuItem}>Cash</div>

        {isAuthenticated && (
          <>
            <div className={styles.menuItem}>{formattedAccount}</div>
            <div className={styles.menuItem} onClick={() => signOut()}>
              Logout
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div className={styles.menuItem} onClick={() => connectWallet()}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
