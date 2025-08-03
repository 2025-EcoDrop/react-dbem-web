import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewFormPage from './pages/ReviewFormPage';
import ReviewDetailPage from './pages/ReviewDetailPage';
import ReviewEditFormPage from './pages/ReviewEditFormPage';
import { checkAuth } from './apis/authApi';
import BookingFormPage from './pages/BookingFormPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await checkAuth();
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path='/review' element={<ReviewsPage />} />
          <Route path="/review/:id" element={<ReviewDetailPage />} />
          <Route path='/review/form' element={<ReviewFormPage />} />
          <Route path='/review/form/:id' element={<ReviewEditFormPage />} />
          <Route path='/booking/form/' element={<BookingFormPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
