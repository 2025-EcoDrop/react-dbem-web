import React, { useState } from 'react';
import styles from '../styles/pages/SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signup } from '../api/authApi';

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !email || !password || !passwordConfirm) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await signup({ username, email, password });
            alert(`${username}님 회원가입 성공`);
            navigate('/login');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>회원가입</h1>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <input
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className={styles.input}
            />
            <button onClick={handleSignup} className={styles.button}>
                회원가입
            </button>

            <p className={styles.loginPrompt}>
                이미 계정이 있으신가요? <Link to="/login" className={styles.loginLink}>로그인</Link>
            </p>
        </div>
    );
};

export default SignupPage;
