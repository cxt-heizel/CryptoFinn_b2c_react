import { Box } from '@mui/material';
import { PublicLayout } from '../../app/layout/PublicLayout';
import { DashboardCharts } from '../../features/dashboard/ui/DashboardCharts';
import { useDashboardStatsQuery } from '../../features/dashboard/hooks/useDashboardStatsQuery';

export const DashboardPage = () => {
  const { data = [], isLoading } = useDashboardStatsQuery();

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <DashboardCharts stats={data} loading={isLoading} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <DashboardCharts stats={data} loading={isLoading} />
      </Box>
    </>
  );
};
