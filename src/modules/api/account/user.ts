import queryString from 'query-string';
import { getAppConfig } from '../../../utils/conf';
import { get } from '../http';

export function getBaseUsersURL(): string {
  const config = getAppConfig();
  if (!config?.apiUrl) {
    throw new Error('APP_CONFIG.apiUrl is not defined');
  }
  return `${config.apiUrl}/users`;
}

export function baseUserURL(userJid: string): string {
  return `${getBaseUsersURL()}/${userJid}`;
}

export interface User {
  jid: string;
  username: string;
  email: string;
}

export interface PaginatedUsersResponse {
  users: User[];
  total: number;
  page: number;
}

export const userAPI = {
  getUser: (token: string, userJid: string): Promise<User> => {
    return get(`${getBaseUsersURL()}/${userJid}`, token);
  },

  getMyself: (token: string): Promise<User> => {
    return get(`${getBaseUsersURL()}/me`, token);
  },

  getUsers: (token: string, page?: number, orderBy?: string, orderDir?: 'asc' | 'desc'): Promise<PaginatedUsersResponse> => {
    const params = queryString.stringify({ page, orderBy, orderDir });
    return get(`${getBaseUsersURL()}?${params}`, token);
  },
};
