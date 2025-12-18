import { Box,AppBar,Toolbar,Typography } from '@mui/material';
import { PublicLayout } from '../../app/layout/PublicLayout';
import { DashboardCharts } from '../../features/dashboard/ui/DashboardCharts';
import { useDashboardStatsQuery } from '../../features/dashboard/hooks/useDashboardStatsQuery';

export const DashboardPage = () => {
  const { data = [], isLoading } = useDashboardStatsQuery();

  return (
    <>
     <Typography variant="h5" gutterBottom>
        ConnectPage
      </Typography>
      <Typography color="text.secondary">Build reporting components for your domain here.</Typography>
    </>
  );
};
