import { getAppConfig } from '../../../utils/conf';
import { post } from '../http';

function getBaseURL(): string {
  const config = getAppConfig();
  if (!config?.apiUrl) {
    throw new Error('APP_CONFIG.apiUrl is not defined');
  }
  return `${config.apiUrl}`;
}

// Payload interfaces
export interface RegisterUserPayload {
  username: string;
  email: string;
  name: string;
  password: string;
  recaptchaResponse?: string;
  role?: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface GoogleRegisterPayload {
  idToken: string;
}

export const userAccountAPI = {
  registerUser: (data: RegisterUserPayload): Promise<any> => {
    return post(`${getBaseURL()}/authentication/register`, undefined, data as unknown as Record<string, unknown>);
  },

  registerGoogleUser: (data: GoogleRegisterPayload): Promise<any> => {
    return post(`${getBaseURL()}/register-google`, undefined, data as unknown as Record<string, unknown>);
  },

  // activateUser: (emailCode: string): Promise<any> => {
  //   return post(`${getBaseURL()}/activate/${emailCode}`);
  // },

  // requestToResetPassword: (email: string): Promise<any> => {
  //   return post(`${getBaseURL()}/request-reset-password/${email}`);
  // },

  resetPassword: (data: ResetPasswordPayload): Promise<any> => {
    return post(`${getBaseURL()}/reset-password`, undefined, data as unknown as Record<string, unknown>);
  },

  // resendActivationEmail: (email: string): Promise<any> => {
  //   return post(`${getBaseURL()}/resend-activation-email/${email}`);
  // },
};
