import React, { FC, JSX } from 'react';
import styles from '../styles/layouts/NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authApi';
import { IconType } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';

interface NavBarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const Icon = (Icon:IconType): JSX.Element => {
        let NewIcon = Icon as FC;
        return <NewIcon />;
    };

    const handleLogo = () => {
        if (isLoggedIn) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = async () => {
        try {
            await logout();
            onLogout();
            alert("로그아웃 성공");
            navigate("/login");
        } catch(error: any) {
            alert("로그아웃 실패");
        }
    };

    const handleMyReviews = () => {
        navigate('/review');
    };

    return (
        <nav className={styles.navbar}>
            <button onClick={handleLogo} className={styles.navbarLogoButton}>DBEM</button>
            <div className={styles.navRight}>
                {isLoggedIn && (
                    <button onClick={handleMyReviews} className={styles.navbarReviewButton}>
                        {Icon(FaPencilAlt)}
                    </button>
                )}
                {isLoggedIn ? (
                <button onClick={handleLogout} className={styles.navbarLogButton}>
                    로그아웃
                </button>
                ) : (
                <button onClick={handleLogin} className={styles.navbarLogButton}>
                    로그인
                </button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
