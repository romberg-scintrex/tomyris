import type { JSX } from 'react';
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

interface RegisterPageProps {
  onRegisterUser: (data: RegisterFormValues) => Promise<void>;
  onGetWebConfig: () => Promise<WebConfig>;
}

function RegisterPage({ onRegisterUser, onGetWebConfig }: RegisterPageProps): JSX.Element {
  
  const navigate = useNavigate();

  const [config, setConfig] = useState<WebConfig>();
  const [registeredUser, setRegisteredUser] = useState<RegisteredUser>();
  const [isInternalAuthEnabled, setIsInternalAuthEnabled] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      const configData = await onGetWebConfig();
      setConfig(configData);
    };
    fetchConfig();
  }, [onGetWebConfig]);

  const handleRegister = async (data: RegisterFormValues) => {
    await onRegisterUser(data);
    setRegisteredUser({ username: data.username, email: data.email });

    const role = data.role || 2;
    navigate(role === 1 ? '/contributor/dashboard' : '/customer/dashboard');
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
    return dispatch(registerActions.registerUser(data));
  },
  onGetWebConfig: () => dispatch(registerActions.getWebConfig()),
});

export default connect(null, mapDispatchToProps)(RegisterPage);
