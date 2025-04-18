import { get } from '../http';
import { getBaseUsersURL } from './user';

function getBaseURL(): string {
  return `${getBaseUsersURL()}`;
}

export interface WebConfig {
  features?: Record<string, boolean>;
  role?: Record<string, any>;
  announcements?: string[];
}

export const userRegistrationWebAPI = {
  getWebConfig: (): Promise<WebConfig> => {
    return get(`${getBaseURL()}/config`);
  },
};
