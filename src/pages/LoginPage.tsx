import React, { useState } from 'react';
import styles from '../styles/pages/LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../api/authApi';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ username, password });
            onLogin();
            alert('로그인 성공');
            navigate('/');
        } catch (error: any) {
            // console.log(error.response.data.message);
            alert("아이디 또는 비밀번호가 잘 못 되었습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h1>로그인</h1>
            <input
                type="text"
                placeholder="아이디"
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
            <button onClick={handleLogin} className={styles.button}>
                로그인
            </button>
            
            <p className={styles.signupPrompt}>
                아직 회원이 아니신가요? <Link to="/signup" className={styles.signupLink}>회원가입</Link>
            </p>
        </div>
    );
};

export default LoginPage;
