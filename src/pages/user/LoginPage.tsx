import React, { FC, JSX, useState } from 'react';
import styles from '../../styles/pages/user/LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../../apis/authApi';
import { IconType } from 'react-icons';
import { RiKakaoTalkFill } from "react-icons/ri";

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Icon = (Icon:IconType): JSX.Element => {
        const NewIcon = Icon as FC;
        return <NewIcon />;
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            await login({ username, password });
            onLogin();
            alert('로그인 성공');
            navigate('/');
        } catch (error: any) {
            alert("아이디 또는 비밀번호가 잘 못 되었습니다.");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className={styles.container}>
                <h1>로그인</h1>
                <input
                    type="text"
                    placeholder="아이디 또는 이메일"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type='submit' className={styles.button}>
                    로그인
                </button>
                
                <p className={styles.signupPrompt}>
                    아직 회원이 아니신가요? <Link to="/signup" className={styles.signupLink}>회원가입</Link>
                </p>
                <button type='button' className={styles.kakaoButton} onClick={() => window.location.href='http://localhost:8080/oauth2/authorization/kakao'}>
                    <span className={styles.kakaoIcon}>{Icon(RiKakaoTalkFill)}</span>
                    카카오 계정으로 로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
