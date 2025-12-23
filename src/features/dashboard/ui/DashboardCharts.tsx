import { Grid, Paper, Skeleton, Box } from '@mui/material';
import { DashboardStat } from '../model/types';
import { TextBlock } from '../../../shared/ui/TextBlock';
import { ItemBlock } from '../../../shared/ui/ItemBlock';

interface Props {
  stats: DashboardStat[];
  loading?: boolean;
}

export const DashboardCharts = ({ stats, loading }: Props) => {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Paper sx={{ p: 2 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={1.5}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, md: 4 }} key={stat.label}>
          <Box sx={{padding: '12px 16px'}}>
            <ItemBlock title='비트코인' desc='BTC' >
              <TextBlock title={stat.label} desc={stat.value} align='right'></TextBlock>
            </ItemBlock>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
