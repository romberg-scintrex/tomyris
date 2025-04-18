'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card } from '../../../../components/Card/Card';
import { SingleColumnLayout } from '../../../../components/SingleColumnLayout/SingleColumnLayout';
// import GoogleAuth from '@/components/GoogleAuth/GoogleAuth';
import LoginForm from '../LoginForm/LoginForm';

import * as loginActions from '../modules/loginActions';

import './LoginPage.scss';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  onLogIn: (data: LoginFormData) => Promise<void>;
}

function LoginPage({ onLogIn }: LoginPageProps) {
  const [isInternalAuthEnabled, setIsInternalAuthEnabled] = useState(true);
  const navigate = useNavigate();

  const toggleInternalAuth = () => {
    setIsInternalAuthEnabled(prev => !prev);
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    await onLogIn(data);

    const role = 'contributor';
    if (role === 'contributor') {
      navigate('/contributor/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <SingleColumnLayout>
      <Card title="Log in" className="card-login">
        {/* <GoogleAuth onToggleInternalAuth={toggleInternalAuth} /> */}
        {isInternalAuthEnabled && <LoginForm onSubmit={onLoginSubmit} />}
      </Card>
    </SingleColumnLayout>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  onLogIn: (data: LoginFormData) =>
    dispatch(loginActions.logIn(data.email, data.password)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
