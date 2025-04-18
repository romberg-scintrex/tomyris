import { RootState } from './types';

export function selectIsLoggedIn(state: RootState): boolean {
  return !!state.session.token;
}

export function selectToken(state: RootState): string | null {
  return state.session.token;
}

export function selectUserJid(state: RootState): string {
  return state.session.user!.jid;
}

export function selectUserEmail(state: RootState): string {
  return state.session.user!.email;
}

export function selectMaybeUserJid(state: RootState): string | null {
  return state.session.user?.jid || null;
}

export function selectMaybeUsername(state: RootState): string | null {
  return state.session.user?.username || null;
}
