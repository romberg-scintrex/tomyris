// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sessionReducer from './session/sessionReducer';
import toastMiddleware from './toast/toastMiddleware';

export const history = createBrowserHistory();

// Root reducer
const rootReducer = combineReducers({
  session: sessionReducer,
  router: connectRouter(history),
});

// Persisted reducer (only session)
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['session'],
  },
  rootReducer
);

// Create store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(toastMiddleware),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
