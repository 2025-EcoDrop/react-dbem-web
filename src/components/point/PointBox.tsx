import React, { useState } from "react";
import PointHistory from "./PointHistory";
import styles from "../../styles/components/point/PointBox.module.css";
import { HistoryItem } from "../../types/Point";

interface PointBoxProps {
    points: number;
    history: HistoryItem[];
}

const PointBox: React.FC<PointBoxProps> = ({ points, history }) => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className={styles.wrapper}>
            <h3>포인트 현황</h3>
            <div
                className={styles.pointBox}
                onClick={() => setShowHistory((prev) => !prev)}
            >
                <p className={styles.points}>포인트: {points}P</p>
            </div>
            {!showHistory && history.length !== 0 && <p className={styles.guide}>위의 포인트 버튼을 클릭하여 포인트 기록을 확인하실 수 있습니다.</p>}
            {showHistory && history.length !== 0 && <PointHistory history={history} />}
        </div>
    );
};

export default PointBox;
