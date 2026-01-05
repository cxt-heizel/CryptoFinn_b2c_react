import { DashboardStat } from './types';

export type SummaryStat = { title: string; desc: string };

export type YearlyDatum = { year: string; count: number, amount: number };

export type IncomeDatum = { 
  total : number;
  min_income_year : number;
  max_income_year : number;
  min_income : number;
  max_income : number;
};

export type FavoriteDatum = {
  list: {
    name: {
      ko: number;
      en: number;
    };
    user_id: number;
    count: number;
    ratio: number;
  };
  nickname: NicknameItem[];
};

export type NicknameItem = {
  seq: number;
  nickname: string;
  en_name: string;
  ko_name: string;
};

export type TransactionChartDatum = { year: string; value: number};
export type FavoriteChartDatum = { name: string; value: number };
export type BestExchangeDatum = { name: string; value: number; showBubble: boolean };
export type MostCoinDatum = { name: string; value: number; color: string };
export type RankBar = { key: string; width: number; offset: number; highlight: boolean };

export const dashboardAssetStats: DashboardStat[] = Array.from({ length: 4 }, (temp,index) => ({
  label: index,
  value: '88.88888888 | 32%',
}));

export const YearlyData: YearlyDatum[]  = [
  { year: '2020', count: 0, amount: 0 },
  { year: '2021', count: 0, amount: 0 },
  { year: '2022', count: 0, amount: 0 },
  { year: '2023', count: 0, amount: 0 },
  { year: '2024', count: 0, amount: 0 },
  { year: '2025', count: 0, amount: 0 },
]

export const summaryStats: SummaryStat[] = [
  { title: '+1,009,890 원', desc: '실현손익' },
  { title: '1,205,000 건', desc: '거래 데이터' },
  { title: '15 건', desc: '제외 데이터' },
];

export const transactionChartData: TransactionChartDatum[] = [
  { year: '2020', value: 320 },
  { year: '2021', value: 1000 },
  { year: '2022', value: 800 },
  { year: '2023', value: 2100 },
  { year: '2024', value: 1160 },
  { year: '2025', value: 2500 },
];

export const favoriteChartData: FavoriteChartDatum[] = [{ name: '바이낸스', value: 32 }];

export const bestExchangeData: BestExchangeDatum[] = [
  { name: '업비트', value: 7777, label: '7,777만원', barColor: 'var(--Color-greyscale-300)', showBubble: false },
  { name: '바이낸스', value: 9999, label: '9,999만원', barColor: 'var(--Color-greyscale-800)', showBubble: true },
];

export const mostCoinData: MostCoinDatum[] = [
  { name: '이더리움', value: 34, color: 'var(--Color-greyscale-700)' },
  { name: '기타', value: 62, color: 'var(--Color-greyscale-300)' },
];

export const rankBars: RankBar[] = [
  { key: 'r1', width: 6, offset: 4, highlight: true },
  { key: 'r2', width: 14, offset: 8, highlight: false },
  { key: 'r3', width: 39, offset: 12, highlight: false }, // user
  { key: 'r4', width: 53, offset: 18, highlight: false },
  { key: 'r5', width: 100, offset: 10, highlight: false },
  { key: 'r6', width: 44, offset: 6, highlight: false },
  { key: 'r7', width: 82, offset: 22, highlight: false },
];

export const dashboardMockData = {
  assetStats: dashboardAssetStats,
  YearlyData,
  summaryStats,
  transactionChartData,
  favoriteChartData,
  bestExchangeData,
  mostCoinData,
  rankBars,
};
