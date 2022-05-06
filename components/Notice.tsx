import React, { FC } from "react";

const styles = {
    notice: 'flex border border-[#30363b] mx-11 my-4 p-5 flex-col flex-1 rounded',
    noticeContainer: 'flex-1',
    noticeTitle: 'text-gray-500',
    noticeMessage: 'text-white font-bold',
    noticeCTA: 'font-bold text-green-500 cursor-pointer mt-5',
  }

const Notice: FC = () => {
    return (
        <div className={styles.notice}>
            <div className={styles.noticeContainer}>
                <div className={styles.noticeTitle}></div>
                <div className={styles.noticeMessage}>
                Your bank account is ready! Fund your Robinhood account to begin trading. 
                </div>
            </div>
            <div className={styles.noticeCTA}>Add Funds</div>
        </div>
    );
};

export default Notice;