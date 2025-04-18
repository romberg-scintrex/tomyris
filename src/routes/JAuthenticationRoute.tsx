import { Routes, Route } from 'react-router-dom';
import type { JSX } from 'react';

import GuestRoute from '../components/GuestRoute/GuestRoute';
import UserRoute from '../components/UserRoute/UserRoute';

import LoginPage from '../pages/accounts/login/LoginPage/LoginPage';
import LogoutPage from '../pages/accounts/logout/LogoutPage/LogoutPage';
import RegisterPage from '../pages/accounts/register/RegisterPage/RegisterPage';
import RegisteredPage from '../pages/accounts/registered/RegisteredPage/RegisteredPage';
// import JAccountRoutes from './modules/account/JAccountRoutes';
// import JProfilesRoutes from './profiles/JProfilesRoutes';

export default function JAuthenticationRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute component={LoginPage} />} />
      <Route path="/logout" element={<UserRoute component={LogoutPage} />} />
      <Route path="/register" element={<GuestRoute component={RegisterPage} />} />
      <Route path="/registered" element={<RegisteredPage />} />
      
      {/* Future routes */}
      {/* <Route path="/account/*" element={<UserRoute component={JAccountRoutes} />} /> */}
      {/* <Route path="/profiles/*" element={<JProfilesRoutes />} /> */}
    </Routes>
  );
}
