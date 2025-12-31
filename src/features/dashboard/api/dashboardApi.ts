import { apiFetch } from '../../../shared/api/http';
import { DashboardStat, DashboardSummaryRequest, DashboardSummaryResponse } from '../model/types';

const fallbackStats: DashboardStat[] = [
  { label: 'A', value: '88.88888888 | 32%' },
  { label: 'B', value: '88.88888888 | 32%' },
  { label: 'C', value: '88.88888888 | 32%' },
  { label: 'D', value: '88.88888888 | 32%' },
];

export const fetchDashboardStats = async () => {
  // try {
  //   return await apiFetch<DashboardStat[]>('/dashboard/stats');
  // } catch (error) {
  //   console.warn('Using fallback dashboard stats because API request failed.', error);
  //   return fallbackStats;
  // }
};

export const fetchDashboardSummary = async (
  payload: DashboardSummaryRequest,
  headers?: Record<string, string>,
) => {
  return apiFetch<DashboardSummaryResponse>('/dashboard/ajax_get_dashboard_summary', {
    method: 'POST',
    body: payload,
    headers,
  });
};
