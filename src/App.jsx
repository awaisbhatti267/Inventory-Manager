import React from 'react';
import './index.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout';

// Auth Pages
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';

// Pages
import Home from './pages/home';
import Products from './pages/products';
import Setting from './pages/setting';
import Profile from './components/profile';

// Settings sub-pages
import ChangePassword from './pages/settings/change-password';
import Notifications from './pages/settings/notifications';
import Privacy from './pages/settings/privacy';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Setting />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;