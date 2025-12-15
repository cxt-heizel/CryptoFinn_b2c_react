import { apiClient } from '../../../shared/api/client';
import { DashboardStat } from '../model/types';

const fallbackStats: DashboardStat[] = [
  { label: 'Active Users', value: 1280, trend: 6 },
  { label: 'New Signups', value: 320, trend: 12 },
  { label: 'Revenue', value: 45800, trend: -2 },
  { label: 'hello', value: 1130, trend: 100 },
];

export const fetchDashboardStats = async () => {
    return fallbackStats;
  // try {
  //   const { data } = await apiClient.get<DashboardStat[]>('/dashboard/stats');
  //   return data;
  // } catch (error) {
  //   console.warn('Using fallback dashboard stats because API request failed.', error);
  //   return fallbackStats;
  // }
};
