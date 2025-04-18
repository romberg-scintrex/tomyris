// src/modules/session/sessionReducer.ts

interface SessionState {
  token?: string;
  user?: any;
}

const initialState: SessionState = {
  token: undefined,
  user: undefined,
};

// Action types
const PUT_TOKEN = 'session/PUT_TOKEN';
const PUT_USER = 'session/PUT_USER';
const DEL_SESSION = 'session/DEL';

export function PutToken(token: string) {
  return {
    type: PUT_TOKEN,
    payload: token,
  };
}

export function PutUser(user: any) {
  return {
    type: PUT_USER,
    payload: user,
  };
}

export function DelSession() {
  return {
    type: DEL_SESSION,
  };
}

export default function sessionReducer(
  state: SessionState = initialState,
  action: { type: string; payload?: any }
): SessionState {
  switch (action.type) {
    case PUT_TOKEN:
      return { ...state, token: action.payload };
    case PUT_USER:
      return { ...state, user: action.payload };
    case DEL_SESSION:
      return initialState;
    default:
      return state;
  }
}
