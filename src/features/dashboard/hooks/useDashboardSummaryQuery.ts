import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary } from '../api/dashboardApi';
import { DashboardSummaryRequest, DashboardSummaryTypeRequest } from '../model/types';

type UseDashboardSummaryOptions = {
  enabled?: boolean;
  headers?: Record<string, string>;
};


export const useDashboardSummaryQuery = (
  params: DashboardSummaryRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const sessionKey = params.session ?? '';

  return useQuery({
    queryKey: ['dashboard', 'summary', params.year, params.type, sessionKey],
    queryFn: () => fetchDashboardSummary(params, headers),
    enabled: enabled && Boolean(params.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useDashboardYearlyQuery = (
  params: DashboardSummaryTypeRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const paramsWithType: DashboardSummaryRequest = { ...params, type: 'yearly' };
  const sessionKey = paramsWithType.session ?? '';
  return useQuery({
    queryKey: ['dashboard', 'summary', paramsWithType.year,'transactions', paramsWithType.type],
    queryFn: () => fetchDashboardSummary(paramsWithType, headers),
    select: (data) => data.more.list, // 혹은 { name: data.name, email: data.email }
    enabled: enabled && Boolean(paramsWithType.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};



export const useDashboardIncomeQuery = (
  params: DashboardSummaryTypeRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const paramsWithType: DashboardSummaryRequest = { ...params, type: 'yearly' };
  const sessionKey = paramsWithType.session ?? '';
  return useQuery({
    queryKey: ['dashboard', 'summary', paramsWithType.year,'income', paramsWithType.type],
    queryFn: () => fetchDashboardSummary(paramsWithType, headers),
    select: (data) => {
      return {
        total : data.more.total_income,
        min_income_year : data.more.min_income_year,
        max_income_year : data.more.max_income_year,
        min_income : data.more.min_income,
        max_income : data.more.max_income,
      }
    },
    enabled: enabled && Boolean(paramsWithType.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useDashboardFavoriteQuery = (
  params: DashboardSummaryTypeRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const paramsWithType: DashboardSummaryRequest = { ...params, type: 'yearly' };
  const sessionKey = paramsWithType.session ?? '';
  return useQuery({
    queryKey: ['dashboard', 'summary', paramsWithType.year,'favorite', paramsWithType.type],
    queryFn: () => fetchDashboardSummary(paramsWithType, headers),
    select: (data) => {
      return {
        list : data.more.favorite,
        nickname : data.nickname_list
      }
    }, // 혹은 { name: data.name, email: data.email }
    enabled: enabled && Boolean(paramsWithType.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useDashboardBalancesQuery = (
  params: DashboardSummaryTypeRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const paramsWithType: DashboardSummaryRequest = { ...params, type: 'balances' };
  const sessionKey = paramsWithType.session ?? '';

  return useQuery({
    queryKey: ['dashboard', 'summary', paramsWithType.year, paramsWithType.type],
    queryFn: () => fetchDashboardSummary(paramsWithType, headers),
    select: (data) => data.more.list,
    enabled: enabled && Boolean(paramsWithType.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useDashboardExchangeQuery = (
  params: DashboardSummaryTypeRequest,
  options: UseDashboardSummaryOptions = {},
) => {
  const { enabled = true, headers } = options;
  const paramsWithType: DashboardSummaryRequest = { ...params, type: 'exchange' };
  const sessionKey = paramsWithType.session ?? '';

  return useQuery({
    queryKey: ['dashboard', 'summary', paramsWithType.year, paramsWithType.type],
    queryFn: () => fetchDashboardSummary(paramsWithType, headers),
    select: (data) => ({ list: data.more.list, nicknames: data.nickname_list }),
    enabled: enabled && Boolean(paramsWithType.year) && Boolean(sessionKey),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
