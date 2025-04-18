import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { ForbiddenError, UnauthorizedError } from '../../../../modules/api/error';
import { sessionAPI, SessionErrors } from '../../../../modules/api/account/session';
import { DelSession } from '../../../../modules/session/sessionReducer';
import { selectToken } from '../../../../modules/session/sessionSelectors';
// import { PutWebConfig } from '../../modules/userWebReducer';
import { RootState } from '../../../../modules/session/types';
import { WebConfig } from '../../../../modules/api/account/userWeb';

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export function logOut(): AppThunk {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState: () => RootState) => {
    const token = selectToken(getState());

    if (!token) {
      // Token tidak ada, bisa langsung bersihkan session
      dispatch(DelSession());
      // dispatch(PutWebConfig({ role: {}, announcements: [] } as WebConfig));
      return;
    }

    try {
      await sessionAPI.logOut(token);
    } catch (error: any) {
      if (error instanceof ForbiddenError && error.message === SessionErrors.LogoutDisabled) {
        throw new Error('Logout is currently disabled.');
      }

      if (!(error instanceof UnauthorizedError)) {
        throw error;
      }
    }

    dispatch(DelSession());
    // dispatch(PutWebConfig({ role: {}, announcements: [] } as WebConfig));
  };
}
