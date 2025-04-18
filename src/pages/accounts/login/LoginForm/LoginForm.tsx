import { JSX } from 'react';
import { useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import { FormTextInput } from '../../../../components/forms/FormTextInput/FormTextInput';
import { Required } from '../../../../components/forms/validations';

import './LoginForm.scss';

interface LoginFormValues {
  email: string;
  password: string;
  verificationCode: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues, role: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps): JSX.Element {
  const [activeRole, setActiveRole] = useState<'contributor' | 'customer'>('contributor');

  return (
    <Form<LoginFormValues>
      onSubmit={(values) => onSubmit(values, activeRole)}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="login-form__container">
          <div className="login-form__left-panel">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
            <p>eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
          </div>

          <div className="login-form__right-panel">
            <div className="login-form__header">
              <h4>Choose your role and create an account now</h4>
              <p>Start your business by signing up today</p>
            </div>

            <div className="login-form__role-tabs">
              <button
                type="button"
                className={activeRole === 'contributor' ? 'active' : ''}
                onClick={() => setActiveRole('contributor')}
              >
                Contributor
              </button>
              <button
                type="button"
                className={activeRole === 'customer' ? 'active' : ''}
                onClick={() => setActiveRole('customer')}
              >
                Customer
              </button>
            </div>

            <p className="login-form__description">
              Full access to manage and combine applications. You can set up the system,
              check user activity, and ensure all services run smoothly.
            </p>

            <Field
              name="email"
              label="Email"
              validate={Required}
              component={FormTextInput}
            />
            <Field
              name="password"
              label="Password"
              inputType="password"
              validate={Required}
              component={FormTextInput}
            />
            <div className="login-form__verification">
              <Field
                name="verificationCode"
                label="Verification code"
                validate={Required}
                component={FormTextInput}
              />
              <div className="login-form__verification--code">10FKLT</div>
            </div>

            <Button
              type="submit"
              text="Login"
              intent={Intent.SUCCESS}
              loading={submitting}
              fill
              className="login-form__submit"
            />

            <div className="login-form__footer">
              If you don’t have an account yet, please <Link to="/register">click here</Link>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}
