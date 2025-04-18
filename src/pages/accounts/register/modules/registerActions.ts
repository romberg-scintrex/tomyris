import { userAccountAPI } from '../../../../modules/api/account/userAccount';
import { userRegistrationWebAPI } from '../../../../modules/api/account/userRegistration';
import { SubmissionError } from '../../../../modules/form/submissionError';
import type { RegisterUserPayload } from '../../../../modules/api/account/userAccount';

export function getWebConfig() {
  return async () => {
    return await userRegistrationWebAPI.getWebConfig();
  };
}

export const registerUser = (data: RegisterFormValues) => async () => {
  const payload: RegisterUserPayload = {
    username: data.username,
    email: data.email,
    password: data.password,
    recaptchaResponse: data.recaptchaResponse,
    role: data.role,
  };

  try {
    await userAccountAPI.registerUser(payload);
  } catch (error: any) {
    const message: string = error?.response?.data?.message || '';
    const errors: string[] = error?.response?.data?.errors || [];

    if (message.toLowerCase().includes('username')) {
      throw new SubmissionError({ username: message });
    }

    if (message.toLowerCase().includes('email')) {
      throw new SubmissionError({ email: message });
    }

    throw new SubmissionError({
      FORM_ERROR: message || errors[0] || 'Registration failed. Please try again.',
    });
  }
};
