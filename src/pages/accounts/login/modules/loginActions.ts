import { replace } from 'connected-react-router';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';

import { BadRequestError, ForbiddenError } from '../../../../modules/api/error';
import { SessionErrors } from '../../../../modules/api/account/session';
import { sessionAPI } from '../../../../modules/api/account/session';
// import { User, userAPI } from '../../../../modules/api/account/user';
import { WebConfig, userWebAPI } from '../../../../modules/api/account/userWeb';
import { PutToken, PutUser } from '../../../../modules/session/sessionReducer';
// import { PutWebConfig } from '../../modules/userWebReducer';
import { RootState } from '../../../../modules/session/types';
// import {  } from '../../../../modules/api/account/user';

import * as toastActions from '../../../../modules/toast/ToastActions';

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export interface SessionResponse {
  token: string;
  expiresAt?: string;
}

export function logIn(email: string, password: string): AppThunk {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    let session: SessionResponse;

    try {
      session = await sessionAPI.logIn(email, password);
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        if (error.message === SessionErrors.UserNotActivated) {
          dispatch(
            replace({
              pathname: '/need-activation',
              state: { email: error.args?.email },
            })
          );          
          return;
        } else if (error.message === SessionErrors.UserMaxConcurrentSessionsExceeded) {
          throw new Error('Login failed because you are trying to log in from too many places at once.');
        } else {
          throw new Error('Invalid username/password.');
        }
      } else if (error instanceof BadRequestError) {
        throw new Error('For security reasons, please reset your password using the "Forgot password" link.');
      } else {
        throw error;
      }
    }

    await dispatch(afterLogin(session));
  };
}

export function afterLogin(session: SessionResponse): AppThunk {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    const { token } = session;

    // const [user, config]: [User, WebConfig] = await Promise.all([
    //   userAPI.getMyself(token),
    //   userWebAPI.getWebConfig(token),
    // ]);

    // toastActions.showToast(`Welcome, ${user.username}.`);
    dispatch(PutToken(token));
    // dispatch(PutUser(user));
    // dispatch(PutWebConfig(config));
  };
}
