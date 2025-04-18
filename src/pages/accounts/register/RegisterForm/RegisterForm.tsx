import { JSX, useState, useEffect, useRef } from 'react';
import {
  Button,
  Intent,
  Toaster,
  Position,
} from '@blueprintjs/core';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { Link } from 'react-router-dom';

import { createRecaptchaField } from '../../../../components/forms/FormRecaptcha/FormRecaptcha';
import { FormTextInput } from '../../../../components/forms/FormTextInput/FormTextInput';
// import { ErrorToast } from '../../../../components/ToastError/ToastError'; // Komponen custom toast bawah kanan
import {
  ConfirmPassword,
  EmailAddress,
  Required,
  Username,
  composeValidators,
} from '../../../../components/forms/validations';

import './RegisterForm.scss';

const AppToaster = Toaster.create({
  position: Position.TOP,
});

interface RegisterFormValues {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaResponse?: string;
  role?: 'contributor' | 'customer';
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues, role: string) => Promise<any>;
  useRecaptcha?: boolean;
  recaptchaSiteKey?: string;
}

export default function RegisterForm({
  onSubmit,
  useRecaptcha,
  recaptchaSiteKey,
}: RegisterFormProps): JSX.Element {
  const [activeRole, setActiveRole] = useState<'contributor' | 'customer'>('contributor');
  const [floatingError, setFloatingError] = useState<string | null>(null);
  const lastToastError = useRef<string | null>(null);

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setFloatingError(null);
      await onSubmit({ ...values, role: activeRole }, activeRole);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Unknown error';

      AppToaster.show({ message, intent: Intent.DANGER });
      setFloatingError(message);
      return { [FORM_ERROR]: message };
    }
  };

  return (
    <>
      <Form<RegisterFormValues> onSubmit={handleSubmit}>
        {({ handleSubmit, submitError, submitting }) => {
          useEffect(() => {
            if (
              submitError &&
              typeof submitError === 'object' &&
              submitError[FORM_ERROR] &&
              submitError[FORM_ERROR] !== lastToastError.current
            ) {
              AppToaster.show({
                message: submitError[FORM_ERROR],
                intent: Intent.DANGER,
              });
              lastToastError.current = submitError[FORM_ERROR];
            }
          }, [submitError]);

          return (
            <form onSubmit={handleSubmit}>
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
                component={FormTextInput}
                name="username"
                label="Username"
                validate={composeValidators(Required, Username)}
              />
              <Field
                component={FormTextInput}
                name="email"
                label="Email"
                validate={composeValidators(Required, EmailAddress)}
              />
              <Field
                component={FormTextInput}
                name="password"
                label="Password"
                inputType="password"
                validate={Required}
              />
              <Field
                component={FormTextInput}
                name="confirmPassword"
                label="Confirm password"
                inputType="password"
                validate={composeValidators(Required, ConfirmPassword)}
              />

              {useRecaptcha && recaptchaSiteKey && (
                <Field
                  name="recaptchaResponse"
                  validate={Required}
                  component={createRecaptchaField(recaptchaSiteKey)}
                />
              )}

              <div className="form-login__actions">
                <Button
                  type="submit"
                  text="Register"
                  intent={Intent.PRIMARY}
                  loading={submitting}
                  fill
                />
                <p className="form-login__actions-register">
                  Have an account already? <Link to="/login">Log in now</Link>
                </p>
              </div>
            </form>
          );
        }}
      </Form>
    </>
  );
}
