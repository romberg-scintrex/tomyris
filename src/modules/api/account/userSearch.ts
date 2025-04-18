import { getAppConfig } from '../../../utils/conf';
import { get, post } from '../http';

function getBaseURL(): string {
  const config = getAppConfig();
  if (!config?.apiUrl) {
    throw new Error('APP_CONFIG.apiUrl is not defined');
  }
  return `${config.apiUrl}/user-search`;
}

export const userSearchAPI = {
  usernameExists: (username: string): Promise<boolean> => {
    return get(`${getBaseURL()}/username-exists/${encodeURIComponent(username)}`);
  },

  emailExists: (email: string): Promise<boolean> => {
    return get(`${getBaseURL()}/email-exists/${encodeURIComponent(email)}`);
  },

  translateUsernamesToJids: (usernames: string[]): Promise<Record<string, string>> => {
    return post(`${getBaseURL()}/username-to-jid`, undefined, usernames as unknown as Record<string, unknown>);
  },
};
