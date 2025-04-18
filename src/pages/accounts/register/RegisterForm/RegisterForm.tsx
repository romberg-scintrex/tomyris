import { JSX, useState, useEffect, useRef } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import { HorizontalDivider } from '../../../../components/HorizontalDivider/HorizontalDivider';
import { createRecaptchaField } from '../../../../components/forms/FormRecaptcha/FormRecaptcha';
import { FormTextInput } from '../../../../components/forms/FormTextInput/FormTextInput';
import { Username, EmailAddress, ConfirmPassword, Required, composeValidators } from '../../../../components/forms/validations';
import { withSubmissionError } from '../../../../modules/form/submissionError';

import './RegisterForm.scss';

enum UserRole {
  CONTRIBUTOR = 1,
  CUSTOMER = 2,
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues, role: number) => Promise<any>;
  useRecaptcha?: boolean;
  recaptchaSiteKey?: string;
}

export default function RegisterForm({ onSubmit, useRecaptcha, recaptchaSiteKey }: RegisterFormProps): JSX.Element {
  
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.CONTRIBUTOR);

  const handleFormSubmit = withSubmissionError<RegisterFormValues>(async (values) => {
    return await onSubmit({ ...values, role: activeRole }, activeRole);
  });

  const renderRoleTab = (role: UserRole) => {
    const label = UserRole[role];
    return (
      <button
        type="button"
        className={activeRole === role ? 'active' : ''}
        onClick={() => setActiveRole(role)}
      >
        {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
      </button>
    );
  };
  

  const FormRecaptcha = useRecaptcha && recaptchaSiteKey
  ? createRecaptchaField(recaptchaSiteKey)
  : undefined;

  return (
    <Form<RegisterFormValues> onSubmit={handleFormSubmit}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="register-form">
          <div className="login-form__header">
            <h4>Choose your role and create an account now</h4>
            <p>Start your business by signing up today</p>
          </div>

          <div className="login-form__role-tabs">
            {renderRoleTab(UserRole.CONTRIBUTOR)}
            {renderRoleTab(UserRole.CUSTOMER)}
          </div>

          <p className="login-form__description">
            Full access to manage and combine applications. You can set up the system,
            check user activity, and ensure all services run smoothly.
          </p>

          <Field component={FormTextInput} name="username" label="Username" validate={composeValidators(Required, Username)}/>
          <Field component={FormTextInput} name="email" label="Email" validate={composeValidators(Required, EmailAddress)}/>
          <Field component={FormTextInput} name="password" label="Password" inputType="password" validate={Required}/>
          <Field component={FormTextInput} name="confirmPassword" label="Confirm password" inputType="password" validate={composeValidators(Required, ConfirmPassword)}/>
          {FormRecaptcha && (<Field name="recaptchaResponse" validate={Required} component={FormRecaptcha}/>)}

          <HorizontalDivider />

          <div className="form-login__actions">
            <Button type="submit" text="Register" intent={Intent.PRIMARY} loading={submitting} fill/>
            <p className="form-login__actions-register">
              Have an account already? <Link to="/login">Log in now</Link>
            </p>
          </div>

        </form>
      )}
    </Form>
  );
}
