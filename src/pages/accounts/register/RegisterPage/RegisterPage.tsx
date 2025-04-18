'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card } from '../../../../components/Card/Card';
import { SingleColumnLayout } from '../../../../components/SingleColumnLayout/SingleColumnLayout';
import RegisterForm from '../RegisterForm/RegisterForm';
import * as registerActions from '../modules/registerActions';

import './RegisterPage.scss';

interface WebConfig {
  useRecaptcha?: boolean;
  recaptcha?: {
    siteKey?: string;
  };
  announcements?: string[];
  role?: Record<string, any>;
}

interface RegisteredUser {
  username: string;
  email: string;
}

interface RegisterFormValues {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  recaptchaResponse?: string;
  role?: 'contributor' | 'customer';
}

interface RegisterPageProps {
  onRegisterUser: (data: RegisterFormValues) => Promise<void>;
}

function RegisterPage({ onRegisterUser }: RegisterPageProps) {
  const navigate = useNavigate();
  const [config, setConfig] = useState<WebConfig | undefined>(undefined);
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser | undefined>(undefined);
  const [isInternalAuthEnabled, setIsInternalAuthEnabled] = useState(true);

  const handleRegister = async (data: RegisterFormValues) => {
    await onRegisterUser(data);
    setRegisteredUser({ username: data.username, email: data.email });

    const role = data.role || 'customer';
    navigate(role === 'contributor' ? '/contributor/dashboard' : '/customer/dashboard');
  };

  const registerFormProps = {
    useRecaptcha: config?.useRecaptcha,
    recaptchaSiteKey: config?.recaptcha?.siteKey,
  };

  return (
    <SingleColumnLayout>
      <Card title="" className="card-register">
        {registeredUser ? (
          <div className="register-success">
            <h2>Activation required</h2>
            <p>Thank you for registering, <strong>{registeredUser.username}</strong>.</p>
            <p className="card-register__instruction">
              A confirmation email has been sent to <strong>{registeredUser.email}</strong>.
            </p>
            <p>Please check your inbox/spam.</p>
          </div>
        ) : (
          <div className="register-form__container">
            <div className="register-form__left-panel">
              <h2>Grow your skills and unlock opportunities</h2>
              <p>Join thousands of learners and contributors improving their careers with us.</p>
            </div>
            <div className="register-form__right-panel">
              {isInternalAuthEnabled && (
                <RegisterForm onSubmit={handleRegister} {...registerFormProps} />
              )}
            </div>
          </div>
        )}

      </Card>
    </SingleColumnLayout>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  onRegisterUser: (data: RegisterFormValues) => {
    const payload = {
      username: data.username,
      password: data.password,
      email: data.email,
      recaptchaResponse: data.recaptchaResponse,
      // role: data.role,
    };
    return dispatch(registerActions.registerUser(payload));
  },
});

export default connect(null, mapDispatchToProps)(RegisterPage);
