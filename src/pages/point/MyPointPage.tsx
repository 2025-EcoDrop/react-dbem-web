import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/point/MyPointPage.module.css";
import PointBox from "../../components/point/PointBox";
import { getMyPointInfo, getMyPointRecords } from "../../apis/pointApi";
import UserInfoCard from "../../components/point/UserInfoCard";
import { HistoryItem, UserInfo } from "../../types/Point";

const MyPointPage: React.FC = () => {
    const [user, setUser] = useState<UserInfo|null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getMyPointInfo();
            console.log(res);
            setUser(res);
        }

        const fetchPointRecords = async () => {
            const res = await getMyPointRecords();
            console.log(res)
            setHistory(res);
        }

        fetchUser();
        fetchPointRecords();
    }, []);

    if (!user) {
        return <div className={styles.loading}>정보를 불러오는 중...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <h2>개인 정보 및 소유 포인트 현황</h2>
            <div className={styles.container}>
                <div className={styles.card}>
                    <UserInfoCard user={user}/>
                    <hr />
                    <PointBox points={user.balance} history={history} />
                </div>
            </div>
        </div>
    );
};

export default MyPointPage;