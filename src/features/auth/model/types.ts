export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}
