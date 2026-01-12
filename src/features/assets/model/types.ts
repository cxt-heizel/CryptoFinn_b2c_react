import dayjs from 'dayjs';

export type PlatformCategory = 'L' | 'F' | 'W';

export type PlatformConnectType = 'API' | 'EXCEL' | 'FILE' | 'TEMPLATE' | 'WALLET' | 'Binance';

export type PlatformStatus = 'Normal' | 'Deleting' | 'Crawling' | 'Standby' | 'Calculating' | 'Error';

export type ExchangeConnectionStatus = 'ok' | 'I' | 'EX' | (string & {});

export interface AssetFile {
  file_name: string;
  [key: string]: unknown;
}

export interface SubAccount {
  seq_user_exchange: number;
  nickname: string;
  api_key?: string;
  address?: string;
  file_list?: AssetFile[] | null;
  status?: ExchangeConnectionStatus;
  master_en_name?: string;
}

export interface ExchangeMeta {
  seq: number;
  en_name: string;
  ko_name?: string;
  logo?: string;
  category: PlatformCategory;
  type: PlatformConnectType[];
  connect_cnt?: number;
  isSupportsSub?: boolean;
}

export interface UserExchange extends ExchangeMeta {
  seq_user_exchange: number;
  nickname: string;
  api_key?: string;
  address?: string;
  updated_at?: string;
  file_list?: AssetFile[] | null;
  account_type?: string;
  sub_accounts?: SubAccount[];
  status?: ExchangeConnectionStatus;
}

export interface CategorizedUserExchanges {
  category: PlatformCategory;
  platform: UserExchange[];
}

export interface UserExchangesResponse {
  resultVal: string;
  exchange_list: CategorizedUserExchanges[];
}

export interface AllExchangesResponse {
  resultVal: string;
  exchange_list: ExchangeMeta[] | CategorizedUserExchanges[];
}

export interface CrawlerStateResponse {
  resultVal: PlatformStatus;
  deleting: number[];
  crawling: number[];
}

export const categoryLabels: Record<PlatformCategory, string> = {
  L: '국내 거래소',
  F: '해외 거래소',
  W: '지갑',
};

export const statusBadges: Record<
  PlatformStatus,
  { label: string; color: 'success' | 'warning' | 'error'}
> = {
  Normal: { label: '연결완료', color: 'success' },
  Deleting: { label: '삭제중', color: 'warning' },
  Crawling: { label: '수집중', color: 'warning' },
  Standby: { label: '대기중', color: 'warning' },
  Calculating: { label: '연산중', color: 'warning' },
  Error: { label: '오류', color: 'error' },
};

export const statusLabels: Record<
  PlatformStatus,
  { label: string; color: 'success' | 'warning' | 'error'}
> = {
  Normal: { label: '수집이 완료됐어요', color: 'success' },
  Deleting: { label: '삭제중입니다', color: 'warning' },
  Crawling: { label: '수집중입니다', color: 'warning' },
  Standby: { label: '대기중입니다', color: 'warning' },
  Calculating: { label: '연산중입니다', color: 'warning' },
  Error: { label: '오류가 발생하여 연결을 유지할 수 없습니다 삭제 후 다시 연결해 주세요', color: 'error' },
};

const CATEGORY_ORDER: PlatformCategory[] = ['L', 'F', 'W'];

export const sortByCategory = <T extends { category: PlatformCategory }>(list: T[]): T[] => {
  return [...list].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category),
  );
};

export const flattenUserExchanges = (list: CategorizedUserExchanges[]): UserExchange[] => {
  return list.flatMap((item) =>
    item.platform.map((p) => ({
      ...p,
      category: item.category,
    })),
  );
};

export const flattenExchangeMetas = (
  list: ExchangeMeta[] | CategorizedUserExchanges[],
): ExchangeMeta[] => {
  const first = list[0];
  if (first && 'platform' in first) {
    return (list as CategorizedUserExchanges[]).flatMap((item) =>
      item.platform.map((p) => ({
        ...p,
        category: item.category,
      })),
    );
  }
  return list as ExchangeMeta[];
};

export const formatUpdatedAt = (value?: string) => {
  if (!value) return null;
  const parsed = dayjs(value, ['YYYY.MM.DD HH:mm:ss', 'YYYY.MM.DD HH:mm']);
  return parsed.isValid() ? parsed.format('YY.MM.DD HH:mm') : value;
};
