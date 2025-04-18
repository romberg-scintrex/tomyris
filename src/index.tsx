import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store, { persistor } from './modules/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App isDarkMode={true} userJid={null} title="RSTomyris" role="guest" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
