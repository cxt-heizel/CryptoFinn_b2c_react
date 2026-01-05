import dayjs from 'dayjs';
import { apiFetch } from '../../../shared/api/http';
import {
  AllExchangesResponse,
  CrawlerStateResponse,
  ExchangeMeta,
  PlatformConnectType,
  PlatformStatus,
  UserExchangesResponse,
} from '../model/types';

type Headers = Record<string, string> | undefined;

const withDevFallback = async <T>(
  action: () => Promise<T>,
  fallback: () => T,
  label: string,
): Promise<T> => {
  try {
    return await action();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Using fallback ${label} response because API is unavailable.`, error);
      return fallback();
    }
    throw error;
  }
};

const sampleExchanges: ExchangeMeta[] = [
  {
    seq: 1,
    en_name: 'Upbit',
    ko_name: '업비트',
    category: 'L',
    logo: 'https://dev-www.cryptofinn.io/assets/images/icons/upbit.svg',
    type: ['API', 'EXCEL'],
    connect_cnt: 1,
  },
  {
    seq: 2,
    en_name: 'Bithumb',
    ko_name: '빗썸',
    category: 'L',
    logo: 'https://dev-www.cryptofinn.io/assets/images/icons/bithumb.svg',
    type: ['EXCEL'],
    connect_cnt: 0,
  },
  {
    seq: 3,
    en_name: 'Binance',
    ko_name: '바이낸스',
    category: 'F',
    logo: 'https://dev-www.cryptofinn.io/assets/images/icons/binance.svg',
    type: ['API', 'EXCEL'],
    connect_cnt: 1,
    isSupportsSub: true,
  },
  {
    seq: 4,
    en_name: 'Wallet',
    ko_name: '이더리움 지갑',
    category: 'W',
    logo: 'https://dev-www.cryptofinn.io/assets/images/icons/wallet.svg',
    type: ['WALLET'],
    connect_cnt: 0,
  },
];

export const fetchUserExchanges = async (session?: string, headers?: Headers) => {
  return withDevFallback<UserExchangesResponse>(
    () =>
      apiFetch<UserExchangesResponse>('/exchange/ajax_get_user_exchanges', {
        method: 'POST',
        body: { session: session ?? '' },
        headers,
      }),
    () => ({
      resultVal: 'success',
      exchange_list: [
        {
          category: 'L',
          platform: [
            {
              ...sampleExchanges[0],
              seq_user_exchange: 101,
              nickname: '업비트 메인',
              api_key: 'upbit-demo-key',
              updated_at: dayjs().subtract(2, 'hour').format('YYYY.MM.DD HH:mm:ss'),
              file_list: null,
            },
          ],
        },
        {
          category: 'F',
          platform: [
            {
              ...sampleExchanges[2],
              seq_user_exchange: 102,
              nickname: '바이낸스 API',
              api_key: 'binance-demo-key',
              updated_at: dayjs().subtract(1, 'day').format('YYYY.MM.DD HH:mm:ss'),
              file_list: [{ file_name: 'binance_2024.zip' }],
              sub_accounts: [],
            },
          ],
        },
        {
          category: 'W',
          platform: [
            {
              ...sampleExchanges[3],
              seq_user_exchange: 103,
              nickname: '개인지갑',
              address: '0x1234...CDEF',
              type: 'WALLET',
              updated_at: dayjs().subtract(3, 'hour').format('YYYY.MM.DD HH:mm:ss'),
              file_list: [],
            },
          ],
        },
      ],
    }),
    'user exchanges',
  );
};

export const fetchAllExchanges = async (session?: string, headers?: Headers) => {
  return withDevFallback<AllExchangesResponse>(
    () =>
      apiFetch<AllExchangesResponse>('/exchange/ajax_get_exchange_list_all', {
        method: 'POST',
        body: { session: session ?? '' },
        headers,
      }),
    () => ({
      resultVal: 'success',
      exchange_list: sampleExchanges,
    }),
    'exchange list',
  );
};

export const fetchCrawlerState = async (session?: string, headers?: Headers) => {
  return withDevFallback<CrawlerStateResponse>(
    () =>
      apiFetch<CrawlerStateResponse>('/ajax_check_crawler', {
        method: 'POST',
        body: { session: session ?? '' },
        headers,
      }),
    () => ({
      resultVal: 'Normal',
      deleting: [],
      crawling: [],
    }),
    'crawler state',
  );
};

export type ConnectApiPayload = {
  session?: string;
  seq_exchange: string | number;
  serviceName: string;
  nickname: string;
  accesskey: string;
  secretkey: string;
  api_type?: string;
  seq_parent_ue?: string | number;
};

export const connectApi = (payload: ConnectApiPayload) => {
  const body = {
    api_type: 'PRIVATE',
    ...payload,
    seq_exchange: String(payload.seq_exchange),
    seq_parent_ue: String(payload.seq_parent_ue ?? '0'),
  };
  return apiFetch('/exchange/ajax_insert_api', {
    method: 'POST',
    body,
  });
};

export type ConnectBinancePayload = {
  session?: string;
  seq_exchange: string | number;
  nickname: string;
  accesskey: string;
  secretkey: string;
  files?: File[];
};

export const connectBinance = (payload: ConnectBinancePayload) => {
  const formData = new FormData();
  formData.append('seq_exchange', String(payload.seq_exchange));
  formData.append('nickname', payload.nickname);
  formData.append('accesskey', payload.accesskey);
  formData.append('secretkey', payload.secretkey);
  if (payload.files?.length) {
    payload.files.forEach((file) => formData.append('attach_file', file));
  }

  return apiFetch('/exchange/ajax_insert_binance_master', {
    method: 'POST',
    body: formData,
  });
};

export type ConnectFilePayload = {
  session?: string;
  seq_exchange: string | number;
  serviceName: string;
  nickname: string;
  upload_type: PlatformConnectType;
  api_type?: string;
  seq_user_exchange?: string | number;
  seq_parent_ue?: string | number;
  files: File[];
};

export const connectFile = (payload: ConnectFilePayload) => {
  const formData = new FormData();
  formData.append('session', payload.session ?? '');
  formData.append('seq_exchange', String(payload.seq_exchange));
  formData.append('serviceName', payload.serviceName);
  formData.append('nickname', payload.nickname);
  formData.append('upload_type', payload.upload_type);
  formData.append('api_type', payload.api_type ?? 'PRIVATE');
  formData.append('seq_user_exchange', String(payload.seq_user_exchange ?? '0'));
  formData.append('seq_parent_ue', String(payload.seq_parent_ue ?? '0'));

  payload.files.forEach((file) => formData.append('attach_file', file));

  return apiFetch('/exchange/ajax_insert_file', {
    method: 'POST',
    body: formData,
  });
};

export type ConnectWalletPayload = {
  session?: string;
  seq_exchange: string | number;
  nickname: string;
  address: string;
};

export const connectWallet = (payload: ConnectWalletPayload) => {
  return apiFetch('/exchange/ajax_insert_wallet', {
    method: 'POST',
    body: payload,
  });
};

export type UpdateApiKeyPayload = {
  session?: string;
  seq_user_exchange: string | number;
  serviceName: string;
  accesskey: string;
  secretkey: string;
};

export const updateApiKey = (payload: UpdateApiKeyPayload) => {
  return apiFetch('/exchange/ajax_update_key', {
    method: 'POST',
    body: payload,
  });
};

export type UpdateFilePayload = {
  session?: string;
  seq_exchange: string | number;
  serviceName: string;
  nickname: string;
  upload_type: PlatformConnectType;
  api_type: string;
  seq_user_exchange: string | number;
  seq_parent_ue: string | number;
  files: File[];
};

export const updateFile = (payload: UpdateFilePayload) => {
  const formData = new FormData();
  formData.append('session', payload.session ?? '');
  formData.append('seq_exchange', String(payload.seq_exchange));
  formData.append('serviceName', payload.serviceName);
  formData.append('nickname', payload.nickname);
  formData.append('upload_type', payload.upload_type);
  formData.append('api_type', payload.api_type);
  formData.append('seq_user_exchange', String(payload.seq_user_exchange));
  formData.append('seq_parent_ue', String(payload.seq_parent_ue));

  payload.files.forEach((file) => formData.append('attach_file', file));

  return apiFetch('/exchange/ajax_insert_file', {
    method: 'POST',
    body: formData,
  });
};

export type UpdateNicknamePayload = {
  session?: string;
  seq_user_exchange: string | number;
  nickname: string;
};

export const updateNickname = (payload: UpdateNicknamePayload) => {
  return apiFetch<string>('/exchange/ajax_update_nickname', {
    method: 'POST',
    body: payload,
  });
};

export type DeleteExchangePayload = {
  session?: string;
  serviceName: string;
  seq_user_exchange: string | number;
  address?: string;
};

export const deleteExchange = (payload: DeleteExchangePayload) => {
  return apiFetch('/exchange/ajax_delete_data_api', {
    method: 'POST',
    body: payload,
  });
};
