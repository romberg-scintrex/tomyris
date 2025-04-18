import { Home } from '@blueprintjs/icons';
import JAuthenticationRoutes from './routes/JAuthenticationRoute';

export interface RouteItem {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  route: {
    path: string;
    component: React.ComponentType<any>;
  };
}

export const homeRoute: RouteItem = {
  id: 'home',
  icon: Home,
  title: 'Home',
  route: {
    path: '/',
    component: JAuthenticationRoutes,
  },
};

export function getHomeRoute(): RouteItem {
  return homeRoute;
}
