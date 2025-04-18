import { userAccountAPI } from '../../../../modules/api/account/userAccount';
import { userRegistrationWebAPI } from '../../../../modules/api/account/userRegistration';
import { userSearchAPI } from '../../../../modules/api/account/userSearch';
import { SubmissionError } from '../../../../modules/form/submissionError';

export function getWebConfig() {
  // return async () => {
  //   return await userRegistrationWebAPI.getWebConfig();
  // };
}

export function registerUser(data: any) {
  return async () => {
    try {
      await userAccountAPI.registerUser(data);
    } catch (error: any) {
      const message: string = error?.response?.data?.message || '';
      const errors: string[] = error?.response?.data?.errors || [];

      // Handle error by matching known field keywords
      if (message.toLowerCase().includes('username')) {
        throw new SubmissionError({ username: message });
      }

      if (message.toLowerCase().includes('email')) {
        throw new SubmissionError({ email: message });
      }

      // Fallback to generic global form error
      throw new SubmissionError({
        FORM_ERROR: message || errors[0] || 'Registration failed. Please try again.',
      });
    }
  };
}