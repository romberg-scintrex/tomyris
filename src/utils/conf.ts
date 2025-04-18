
export interface AppConfig {
  name: string;
  slogan: string;
  footer: string;
  googleAnalytics?: {
    trackingId: string;
  };
  [key: string]: any;
  apiUrl: string;
}

declare global {
  interface Window {
    conf?: Partial<AppConfig>;
  }
}

export const APP_CONFIG: AppConfig = {
  name: window?.conf?.name ?? 'RSTomyris',
  slogan: window?.conf?.slogan ?? 'Smart UI',
  footer: window?.conf?.footer ?? '© 2025 RSTomyris',
  googleAnalytics: window?.conf?.googleAnalytics,
  apiUrl: 'http://localhost:8000/api',
};

export function getAppConfig(): AppConfig {
  return APP_CONFIG;
}
