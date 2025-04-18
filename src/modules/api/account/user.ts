// import queryString from 'query-string';
// import { getAppConfig } from '../../conf';
// import { get } from '../http';

// // Helper function to get base URL
// export function getBaseUsersURL(): string {
//   const config = getAppConfig();
//   if (!config?.apiUrl) {
//     throw new Error('APP_CONFIG.apiUrl is not defined');
//   }
//   return `${config.apiUrl}/users`;
// }

// // Helper function
// export function baseUserURL(userJid: string): string {
//   return `${getBaseUsersURL()}/${userJid}`;
// }

// // Interface untuk User (sesuaikan sesuai respon dari backend)
// export interface User {
//   jid: string;
//   username: string;
//   email: string;
//   // tambahkan properti lain jika ada
// }

// export interface PaginatedUsersResponse {
//   users: User[];
//   total: number;
//   page: number;
//   // tambahkan properti lain jika perlu
// }

// // API
// export const userAPI = {
//   getUser: (token: string, userJid: string): Promise<User> => {
//     return get(`${getBaseUsersURL()}/${userJid}`, token);
//   },

//   getMyself: (token: string): Promise<User> => {
//     return get(`${getBaseUsersURL()}/me`, token);
//   },

//   getUsers: (
//     token: string,
//     page?: number,
//     orderBy?: string,
//     orderDir?: 'asc' | 'desc'
//   ): Promise<PaginatedUsersResponse> => {
//     const params = queryString.stringify({ page, orderBy, orderDir });
//     return get(`${getBaseUsersURL()}?${params}`, token);
//   },
// };
