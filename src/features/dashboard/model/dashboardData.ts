import { DashboardStat } from './types';

export type SummaryStat = { title: string; desc: string };
export type TransactionChartDatum = { year: string; value: number };
export type IncomeChartDatum = { year: string; value: number; label: string; color: string; showLabel: boolean };
export type FavoriteChartDatum = { name: string; value: number };
export type BestExchangeDatum = { name: string; value: number; label: string; barColor: string; showBubble: boolean };
export type MostCoinDatum = { name: string; value: number; color: string };
export type RankBar = { key: string; width: number; offset: number; highlight: boolean };

export const dashboardAssetStats: DashboardStat[] = Array.from({ length: 12 }, () => ({
  label: '134,545,432원',
  value: '88.88888888 | 32%',
}));

export const summaryStats: SummaryStat[] = [
  { title: '+1,009,890 원', desc: '실현손익' },
  { title: '1,205,000 건', desc: '거래 데이터' },
  { title: '15 건', desc: '제외 데이터' },
];

export const transactionChartData: TransactionChartDatum[] = [
  { year: '2020', value: 120 },
  { year: '2021', value: 135 },
  { year: '2022', value: 420 },
  { year: '2023', value: 2100 },
  { year: '2024', value: 480 },
  { year: '2025', value: 1600 },
];

export const incomeChartData: IncomeChartDatum[] = [
  { year: '2021년', value: 546, label: '546만원', color: 'var(--Color-greyscale-300)', showLabel: false },
  { year: '2023년', value: 1944, label: '1,944만원', color: 'var(--Color-greyscale-800)', showLabel: true },
];

export const favoriteChartData: FavoriteChartDatum[] = [{ name: '바이낸스', value: 32 }];

export const bestExchangeData: BestExchangeDatum[] = [
  { name: '빗썸', value: 34, label: '34만원', barColor: 'var(--Color-greyscale-300)', showBubble: false },
  { name: '업비트', value: 1944, label: '1,944만원', barColor: 'var(--Color-greyscale-800)', showBubble: true },
];

export const mostCoinData: MostCoinDatum[] = [
  { name: '이더리움', value: 34, color: 'var(--Color-greyscale-700)' },
  { name: '기타', value: 62, color: 'var(--Color-greyscale-300)' },
];

export const rankBars: RankBar[] = [
  { key: 'r1', width: 88, offset: 4, highlight: false },
  { key: 'r2', width: 78, offset: 8, highlight: false },
  { key: 'r3', width: 68, offset: 12, highlight: true }, // user
  { key: 'r4', width: 60, offset: 18, highlight: false },
  { key: 'r5', width: 72, offset: 10, highlight: false },
  { key: 'r6', width: 86, offset: 6, highlight: false },
  { key: 'r7', width: 58, offset: 22, highlight: false },
];

export const dashboardMockData = {
  assetStats: dashboardAssetStats,
  summaryStats,
  transactionChartData,
  incomeChartData,
  favoriteChartData,
  bestExchangeData,
  mostCoinData,
  rankBars,
};
