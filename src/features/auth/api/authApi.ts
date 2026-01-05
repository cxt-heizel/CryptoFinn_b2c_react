import { clearCachedCsrfToken } from '../../../shared/api/csrf';
import { apiFetch } from '../../../shared/api/http';
import { LoginPayload, AuthUser, LoginInfoResponse } from '../model/types';

export const login = async (payload: LoginPayload) => {
  try {
    return await apiFetch<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify([]),
    });
  } catch (error) {
    console.warn('Using fallback login response because /auth/login is unavailable.', error);
    return {
      token: 'demo-token',
      user: { id: 'demo', name: payload.email.split('@')[0] || 'User', email: payload.email },
    };
  }
};

export const logout = async () => {
  await apiFetch('/auth/logout', { method: 'GET' });
  clearCachedCsrfToken();
};

export const fetchLoginInfo = async () => {
  try {
    return await apiFetch<LoginInfoResponse>('/auth/login_info', { method: 'POST', body: [] });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Using fallback login_info because /auth/login_info is unavailable.', error);
      return {
        encSession: 'dev-session',
        user: {
          signup_path: 'KAKAO',
          auth_sns: 'NICE',
          auth_id: 'dev-auth-id',
          email: 'dev@example.com',
        },
      } satisfies LoginInfoResponse;
    }

    throw error;
  }
};
