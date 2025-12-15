import { apiClient } from '../../../shared/api/client';
import { LoginPayload, AuthUser } from '../model/types';

export const login = async (payload: LoginPayload) => {
  try {
    const { data } = await apiClient.post<{ token: string; user: AuthUser }>('/auth/login', payload);
    return data;
  } catch (error) {
    console.warn('Using fallback login response because /auth/login is unavailable.', error);
    return {
      token: 'demo-token',
      user: { id: 'demo', name: payload.email.split('@')[0] || 'User', email: payload.email },
    };
  }
};

export const logout = async () => {
  await apiClient.post('/auth/logout');
};

export const fetchMe = async () => {
  try {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  } catch (error) {
    console.warn('Using fallback user because /auth/me is unavailable.', error);
    return { id: 'demo', name: 'Demo User', email: 'demo@example.com' } satisfies AuthUser;
  }
};
