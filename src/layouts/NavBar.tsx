import React, { FC, JSX } from 'react';
import styles from '../styles/layouts/NavBar.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../apis/authApi';
import { IconType } from 'react-icons';
import { FaPills  } from 'react-icons/fa';
import { BsPatchCheckFill } from 'react-icons/bs';
import { MdMedicalServices, MdMedication } from 'react-icons/md';
import { FaWallet } from "react-icons/fa";


interface NavBarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const Icon = (Icon:IconType): JSX.Element => {
        const NewIcon = Icon as FC;
        return <NewIcon />;
    };

    const handleLogo = () => {
        navigate('/');
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
    
    const handleBookings = () => {
        navigate('/booking')
    }

    const handleBookingForm = () => {
        navigate('/booking/form');
    }

    const handleMyBookings = () => {
        navigate('/booking/my');
    }

    const handleMyPointInfo = () => {
        navigate('/point')
    }

    return (
        <nav className={styles.navbar}>
            <button onClick={handleLogo} className={styles.navbarLogoButton}>DBEM</button>
            <div className={styles.navRight}>
                {isLoggedIn && (
                    <label>
                        <button onClick={handleBookings} className={styles.navbarBookingButton}>
                            {Icon(MdMedicalServices)}
                        </button>
                         수거 조회
                    </label>  
                )}
                    
                {isLoggedIn && (
                    <label>
                        <button onClick={handleBookingForm} className={styles.navbarBookingFormButton}>
                            {Icon(MdMedication)}
                        </button>
                         수거 예약
                    </label>
                )}
                {isLoggedIn && (
                    <label>
                        <button onClick={handleMyBookings} className={styles.navbarBookingCheckButton}>
                            {Icon(BsPatchCheckFill)}
                        </button>
                         수거 확인
                    </label>
                )}
                {isLoggedIn && (
                    <label>
                        <button onClick={handleMyReviews} className={styles.navbarReviewButton}>
                            {Icon(FaPills)}
                        </button>
                         리뷰 확인
                    </label>
                )}
                {isLoggedIn && (
                    <label>
                        <button onClick={handleMyPointInfo} className={styles.navbarBookingCheckButton}>
                            {Icon(FaWallet)}
                        </button>
                        포인트 확인
                    </label>
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
