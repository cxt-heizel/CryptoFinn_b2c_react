import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary } from '../api/dashboardApi';
import { DashboardSummaryRequest } from '../model/types';

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
