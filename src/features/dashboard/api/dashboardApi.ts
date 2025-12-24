import { apiFetch } from '../../../shared/api/http';
import { DashboardStat, DashboardSummaryRequest, DashboardSummaryResponse } from '../model/types';

const fallbackStats: DashboardStat[] = [
  { label: 'Active Users', value: 1280, trend: 6 },
  { label: 'New Signups', value: 320, trend: 12 },
  { label: 'Revenue', value: 45800, trend: -2 },
  { label: 'hello', value: 1130, trend: 100 },
];

export const fetchDashboardStats = async () => {
    return fallbackStats;
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
