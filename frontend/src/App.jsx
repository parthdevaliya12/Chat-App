import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const { checkAuth, authUser, isCheckingAuth, subscribeToOnlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      subscribeToOnlineUsers();
    }
  }, [authUser, subscribeToOnlineUsers]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-midnight-950 text-pearl-100';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-pearl-100 text-midnight-900';
    }
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" richColors closeButton theme={theme} />
    </>
  );
};

export default App;
