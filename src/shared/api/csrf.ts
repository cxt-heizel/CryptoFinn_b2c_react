type CsrfResponse = { token: string };

let csrfToken: string | null = null;
let csrfPromise: Promise<string> | null = null;

const CSRF_ENDPOINT = '/csrf/token';

export const fetchCsrfToken = async (): Promise<string> => {
  const response = await fetch(CSRF_ENDPOINT, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CSRF token (${response.status})`);
  }

  const data = (await response.json()) as CsrfResponse;

  if (!data?.token) {
    throw new Error('CSRF token response missing token field');
  }

  return data.token;
};

export const ensureCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  if (!csrfPromise) {
    csrfPromise = fetchCsrfToken()
      .then((token) => {
        csrfToken = token;
        return token;
      })
      .finally(() => {
        csrfPromise = null;
      });
  }

  return csrfPromise;
};

export const clearCachedCsrfToken = () => {
  csrfToken = null;
};
