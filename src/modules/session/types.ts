export interface User {
    jid: string;
    email: string;
    username: string;
  }
  
  export interface SessionState {
    token: string | null;
    user: User | null;
  }
  
  export interface RootState {
    session: SessionState;
  }