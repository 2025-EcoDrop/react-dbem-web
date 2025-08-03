import React, { useState } from 'react';
import styles from '../styles/pages/SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { checkUsername, signup } from '../apis/authApi';

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isUsernameChecked, setIsUsernameChecked] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const navigate = useNavigate();

    const checkUsernameAvailability = async () => {
        try {
            const response = await checkUsername(username);
            setIsUsernameChecked(true);
            setIsUsernameAvailable(response.exists);
            alert(response.message);
        } catch (error) {
            console.error(error);
            alert('아이디 중복 확인 중 오류가 발생했습니다.');
        }
    };

    const sendEmailVerification = async () => {
        try {
            // 나중에 개발 예정
            // const response = await checkEmail(email);
            alert('인증 메일이 전송되었습니다.');
        } catch (error) {
            console.error(error);
            alert('이메일 인증 요청 중 오류가 발생했습니다.');
        }
    };

    const handleSignup = async () => {
        if (!username || !email || !password || !passwordConfirm) {
            alert('모든 항목을 입력 해주세요.');
            return;
        }

        if (!isUsernameChecked) {
            alert('아이디 중복 확인을 해주세요.');
            return;
        }

        if (!isUsernameAvailable) {
            alert('해당 아이디 사용이 불가능합니다.');
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
            if (error.response.data.message) {
                alert(error.response.data.message);
            } else if (error.response.data.username) {
                alert(error.response.data.username);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>회원가입</h1>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value); setIsUsernameChecked(false);}}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={checkUsernameAvailability}
                    className={styles.button}
                    disabled={isUsernameChecked && isUsernameAvailable}
                >
                    {isUsernameChecked && isUsernameAvailable ? '사용 가능 O' : '아이디 확인'}
                </button>
            </div>
            <div className={styles.inputGroup}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <button type="button" onClick={sendEmailVerification} className={styles.button}>
                    이메일 인증
                </button>
            </div>
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
            <div className={styles.guide}>
                <span>1. 아이디는 다음 조건을 만족해야 합니다:</span>
                <ul>
                    <li>6자 이상 25자 이하</li>
                </ul>
                <span>2. 비밀번호는 다음 조건을 만족해야 합니다:</span>
                <ul>
                    <li>8자 이상 20자 이하</li>
                    <li>영문자 최소 1자 포함</li>
                    <li>숫자 최소 1자 포함</li>
                    <li>특수문자 최소 1자 포함 (허용: !, @, #, $, %, ^, &, *)</li>
                    <li>허용되지 않은 문자가 없어야 함</li>
                </ul>
            </div>
            <button onClick={handleSignup} className={styles.submitButton}>
                회원가입
            </button>

            <p className={styles.loginPrompt}>
                이미 계정이 있으신가요? <Link to="/login" className={styles.loginLink}>로그인</Link>
            </p>
        </div>
    );
};

export default SignupPage;
