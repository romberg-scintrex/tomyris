import { get } from '../http';
import { getBaseUsersURL } from './user'; // ganti baseUsersURL jadi function

// function getBaseURL(): string {
//   return `${getBaseUsersURL()}/registration/web`;
// }

export interface WebConfig {
  theme?: string;
  layout?: string;
  features?: Record<string, boolean>;
  role?: Record<string, any>;
  announcements?: string[];
}

export const userRegistrationWebAPI = {
  // getWebConfig: (): Promise<WebConfig> => {
  //   return get(`${getBaseURL()}/config`);
  // },
};
