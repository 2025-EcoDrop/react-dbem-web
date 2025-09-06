import React from 'react';
import NavBar from './NavBar';

interface LayoutProps {
    children: React.ReactNode;
    isLoggedIn: boolean;
    onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogout }: LayoutProps) => {
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main style={{ padding: '2rem 0rem 4rem 0rem' }}>{children}</main>
            {/* 나중에 footer 만들면 추가하기 */}
        </div>
    );
};

export default Layout;
