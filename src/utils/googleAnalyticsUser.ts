import ReactGA from 'react-ga4';
import { APP_CONFIG } from './conf';

type EventArgs = Parameters<typeof ReactGA.event>[0];

interface History {
  listen: (listener: (location: Location) => void) => void;
}

interface Location {
  pathname: string;
  search: string;
}

export function initGoogleAnalytics(history: History): void {
  if (APP_CONFIG.googleAnalytics) {
    ReactGA.initialize(APP_CONFIG.googleAnalytics.trackingId);
    history.listen((location: Location) => {
      let page = location.pathname.replace(/\/+$/, '');
      if (page === '') {
        page = '/';
      }
      page += location.search;

      ReactGA.set({ page });
      ReactGA.send({ hitType: 'pageview', page });
    });
  }
}

export function setGoogleAnalyticsUser(userJid: string | null): void {
  if (APP_CONFIG.googleAnalytics && userJid) {
    ReactGA.set({ user_id: userJid });
  }
}

export function sendGoogleAnalyticsEvent(args: EventArgs): void {
  if (APP_CONFIG.googleAnalytics) {
    ReactGA.event(args);
  }
}
