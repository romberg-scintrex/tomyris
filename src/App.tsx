'use client';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import type { JSX } from 'react';

import { AppContent } from './components/AppContent/AppContent';
import { Footer } from './components/Footer/Footer';
import Header from './components/Header/Header';
import { setGoogleAnalyticsUser } from './utils/googleAnalyticsUser';
import { getHomeRoute } from './AppRoutes';
import { APP_CONFIG } from './utils/conf';

interface AppProps {
  isDarkMode: boolean;
  userJid: string | null;
  title: string;
  role: string;
}

export const BlueprintContext = React.createContext<'bp5-light' | 'bp5-dark'>('bp5-light');

export default function App({ isDarkMode, userJid, title }: AppProps): JSX.Element {
  const homeRoute = getHomeRoute();
  React.useEffect(() => {
    setGoogleAnalyticsUser(userJid);
  }, [userJid]);

  return (
    <HelmetProvider>
      <BlueprintContext.Provider value={isDarkMode ? 'bp5-dark' : 'bp5-light'}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <div className={classNames({ 'bp5-light': !isDarkMode, 'bp5-dark': isDarkMode })}>
          <Header items={[]} homeRoute={homeRoute as any} />
          <AppContent>
            <Routes>
              <Route
                path="*"
                element={React.createElement(homeRoute.route.component)}
              />
            </Routes>
            <Footer />
          </AppContent>
        </div>
      </BlueprintContext.Provider>
    </HelmetProvider>
  );  
}
