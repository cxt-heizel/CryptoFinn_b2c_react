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
  password?: string;
  body?: unknown[];
}

export interface LoginInfoUser {
  signup_path: string;
  auth_sns: string;
  auth_id: string;
  email: string;
}

export interface LoginInfoResponse {
  encSession: string;
  user: LoginInfoUser | null;
}
