import styles from "../../styles/components/point/PointHistory.module.css";
import { HistoryItem } from "../../types/Point";

interface PointHistoryProps {
  history: HistoryItem[];
}

const PointHistory = ({ history }: PointHistoryProps) => {
    return (
        <div className={styles.historyContainer}>
            <h3 className={styles.title}>포인트 내역</h3>
            <ul className={styles.list}>
                {history.map((item) => (
                <li
                    key={item.id}
                    className={`${styles.item} ${
                        item.type === 'USE' ? styles.use : styles.earn
                    }`}
                >
                    <span>{item.source !== 'APP' 
                        ? (!isNaN(Number(item.source)) ? `${item.username}님이 작성하신 수거 예약에 의해 포인트가 차감되었습니다.` : `${item.source}님에 의해 포인트 변동이 발생하였습니다.`)
                        : 'DBEM에 의해 포인트 변동이 발생하였습니다.'}
                    </span>
                    <span>{item.type === 'USE' || item.type === 'EXCHANGE' ? `- ${item.amount}` : `+ ${item.amount}`}</span>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default PointHistory;
