import { Tab, Tabs } from '@blueprintjs/core';
import { Link, useLocation } from 'react-router-dom';
import type { JSX } from 'react';

import './Menubar.scss';

interface RouteItem {
  id: string;
  title: string;
  route: {
    path: string;
    exact?: boolean;
    component: React.ComponentType<any>;
  };
}

interface MenubarProps {
  items: RouteItem[];
  homeRoute?: RouteItem;
}

export default function Menubar({ items, homeRoute }: MenubarProps): JSX.Element {
  const location = useLocation();

  const getActiveItemId = (): string => {
    const matchingItem = items.find(item => matchPath(item.route.path, location.pathname));
    if (matchingItem) return matchingItem.id;
    if (homeRoute) return homeRoute.id;
    return items[0].id;
  };

  const matchPath = (path: string, currentPath: string): boolean => {
    // Very simple match: startsWith
    const normalizedPath = path.replace(/\/+$/, '');
    const normalizedCurrent = currentPath.replace(/\/+$/, '');
    return normalizedCurrent === normalizedPath || normalizedCurrent.startsWith(normalizedPath + '/');
  };

  const resolveUrl = (newTabId: string): string => {
    const newTabItem = newTabId === homeRoute?.id
      ? homeRoute
      : items.find(item => item.id === newTabId);

    return newTabItem?.route.path ?? '/';
  };

  const selectedTabId = getActiveItemId();

  return (
    <div className="menubar">
      <Tabs id="menubar" renderActiveTabPanelOnly animate={false} selectedTabId={selectedTabId}>
        {homeRoute && (
          <Tab key={homeRoute.id} id={homeRoute.id}>
            <Link to={resolveUrl(homeRoute.id)}>{homeRoute.title}</Link>
          </Tab>
        )}
        {items.map(item => (
          <Tab key={item.id} id={item.id}>
            <Link to={resolveUrl(item.id)}>{item.title}</Link>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
