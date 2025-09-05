import React from "react";
import styles from "../../styles/components/point/PointHistory.module.css";
import { HistoryItem } from "../../types/Point";

interface PointHistoryProps {
  history: HistoryItem[];
}

const PointHistory: React.FC<PointHistoryProps> = ({ history }) => {
    return (
        <div className={styles.historyContainer}>
            <h3 className={styles.title}>포인트 내역</h3>
            <ul className={styles.list}>
                {history.map((item) => (
                <li
                    key={item.id}
                    className={`${styles.item} ${
                        item.type === "USE" ? styles.use : styles.earn
                    }`}
                >
                    <span>{item.source !== 'APP' ? `${item.source}님에 의해 포인트 변동이 생겼습니다.` : 'DBEM에서 제공하였습니다.'}</span>
                    <span>{item.type === "USE" ? `- ${item.amount}` : `+ ${item.amount}`}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default PointHistory;
