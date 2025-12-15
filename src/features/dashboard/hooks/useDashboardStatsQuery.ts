import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../api/dashboardApi';

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
  });
};
