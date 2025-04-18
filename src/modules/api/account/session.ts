import { getAppConfig } from '../../../utils/conf';
import { post } from '../http';

export const SessionErrors = {
  UserNotActivated: 'Authentication:UserNotActivated',
  UserMaxConcurrentSessionsExceeded: 'Authentication:UserMaxConcurrentSessionsExceeded',
  LogoutDisabled: 'Authentication:LogoutDisabled',
};

function getBaseUrl(): string {
  const config = getAppConfig();
  if (!config?.apiUrl) {
    throw new Error('APP_CONFIG.apiUrl is not defined');
  }
  return `${config.apiUrl}`;
}

export const sessionAPI = {
  logIn: (email: string, password: string) => {
    return post(`${getBaseUrl()}/authentication/login`, undefined, { email, password });
  },

  // logInWithGoogle: (idToken: string) => {
  //   return post(`${getBaseUrl()}/login-google`, undefined, { idToken });
  // },

  logOut: (token: string): Promise<void> => {
    return post(`${getBaseUrl()}/logout`, token, {});
  },
};
