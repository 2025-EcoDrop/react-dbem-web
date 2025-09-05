import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { checkAuth } from './apis/authApi';
import Layout from './layouts/Layout';
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import ReviewsPage from './pages/review/ReviewsPage';
import ReviewFormPage from './pages/review/ReviewFormPage';
import ReviewDetailPage from './pages/review/ReviewDetailPage';
import ReviewEditFormPage from './pages/review/ReviewEditFormPage';
import BookingsPage from './pages/booking/BookingsPage';
import MyBookingsPage from './pages/booking/MyBookingsPage';
import BookingFormPage from './pages/booking/BookingFormPage';
import BookingEditFormPage from './pages/booking/BookingEditFormPage';
import MainPage from './pages/MainPage';
import OAuthSuccess from './pages/OAuthSuccess';
import MyPointPage from './pages/point/MyPointPage';


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
          <Route path='/' element={<MainPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
          <Route path='/review' element={<ReviewsPage />} />
          <Route path="/review/:id" element={<ReviewDetailPage />} />
          <Route path='/review/form' element={<ReviewFormPage />} />
          <Route path='/review/form/:id' element={<ReviewEditFormPage />} />
          <Route path='/booking' element={<BookingsPage />} />
          <Route path='/booking/my' element={<MyBookingsPage />} />
          <Route path='/booking/form' element={<BookingFormPage />} />
          <Route path='/booking/form/:id' element={<BookingEditFormPage />} />
          <Route path='/point' element={<MyPointPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
