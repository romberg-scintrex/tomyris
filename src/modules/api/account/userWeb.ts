import { getAppConfig } from '../../../utils/conf';
import { get } from '../http';

// Definisi tipe WebConfig (ubah sesuai response API sebenarnya)
export interface WebConfig {
  theme?: string;
  layout?: string;
  features?: Record<string, boolean>;
  role: Record<string, any>;
  announcements: string[];
}

// Helper untuk mengakses baseURL secara dinamis
function getBaseURL(): string {
  const config = getAppConfig();
  if (!config?.apiUrl) {
    throw new Error('APP_CONFIG.apiUrl is not defined');
  }
  return `${config.apiUrl}/user-web`;
}

export const userWebAPI = {
  getWebConfig: (token: string): Promise<WebConfig> => {
    return get(`${getBaseURL()}/config`, token);
  },
};
