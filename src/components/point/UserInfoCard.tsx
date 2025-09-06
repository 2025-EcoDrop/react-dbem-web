import styles from "../../styles/components/point/UserInfoCard.module.css";
import { UserInfo } from "../../types/Point";

interface UserInfoCardProps {
    user: UserInfo;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
    return (
        <div className={styles.card}>
            <h3>개인 정보</h3>
            <div className={styles.info}>
                <div className={styles.name}>- 아이디: {user.username}</div>
                {/* {user.provider === null 
                    ? <div className={styles.name}>아이디: {user.username}</div>
                    : <div className={styles.name}>아이디: {user.email.split('@')[0]}</div>
                } */}
                <div className={styles.name}>- 이메일 : {user.email}</div>
                {user.provider !== null &&
                    <div className={styles.name}>- 로그인계정: {user.provider}</div>
                }
            </div>
        </div>
    );
};

export default UserInfoCard;
