import { ensureCsrfToken } from './csrf';
import { API_BASE_URL } from '../config/env';
import { queryClient } from '../../app/config/queryClient';
import { AUTH_LOGIN_INFO_QUERY_KEY } from '../constants/queryKeys';

type ApiFetchOptions = Omit<RequestInit, 'body' | 'method' | 'credentials'> & {
  method?: RequestInit['method'];
  body?: unknown;
};

const JSON_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof FormData) &&
    !(value instanceof Blob) &&
    !(value instanceof ArrayBuffer) &&
    !ArrayBuffer.isView(value)
  );
};

const hasContentTypeHeader = (headers: HeadersInit) => {
  if (headers instanceof Headers) {
    return headers.has('Content-Type');
  }

  if (Array.isArray(headers)) {
    return headers.some(([key]) => key.toLowerCase() === 'content-type');
  }

  if (typeof headers === 'object' && headers !== null) {
    return Object.keys(headers).some((key) => key.toLowerCase() === 'content-type');
  }

  return false;
};

const buildUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = API_BASE_URL || '';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedBase && normalizedPath.startsWith(normalizedBase)) {
    return normalizedPath;
  }

  return `${normalizedBase}${normalizedPath}` || normalizedPath;
};

/**
 * Example:
 * await apiFetch('/dashboard/ajax_get_dashboard_summary', { method: 'POST', body: { year: '2025' } });
 */
export const apiFetch = async <T = unknown>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> => {
  const { method = 'GET', body, headers = {}, ...rest } = options;
  const normalizedMethod = method.toUpperCase();
  const shouldAttachCsrf = JSON_METHODS.has(normalizedMethod);

  let payload = body;

  const isJsonPayload = isPlainObject(payload) || Array.isArray(payload);
  let finalHeaders: HeadersInit = {
    Accept: 'application/json',
    ...headers,
  };

  if (shouldAttachCsrf) {
    const token = await ensureCsrfToken();
    finalHeaders = {
      'X-CSRF-TOKEN': token,
      ...finalHeaders,
    };
  }

  if (isJsonPayload && !hasContentTypeHeader(finalHeaders)) {
    finalHeaders = {
      ...finalHeaders,
      'Content-Type': 'application/json',
    };
  }

  let requestBody: BodyInit | undefined;
  if (payload !== undefined && payload !== null) {
    requestBody = isJsonPayload ? JSON.stringify(payload) : (payload as BodyInit);
  }

  const response = await fetch(buildUrl(path), {
    ...rest,
    method: normalizedMethod,
    credentials: 'include',
    headers: finalHeaders,
    body: requestBody,
  });

  if (response.status === 401 || response.status === 403) {
    void queryClient.removeQueries({ queryKey: AUTH_LOGIN_INFO_QUERY_KEY });
    if (typeof window !== 'undefined') {
      window.location.replace('/login');
    }
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `Request to ${path} failed (${response.status} ${response.statusText})${errorBody ? `: ${errorBody}` : ''}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
};
