import { Grid,  Paper, Skeleton, Stack, Typography } from '@mui/material';
import { formatNumber } from '../../../shared/lib/number';
import { DashboardStat } from '../model/types';

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
    <Grid container spacing={2}>
      {stats.map((stat) => (
        <Grid size={{ xs: 12, md: 3 }} key={stat.label}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h4">{formatNumber(stat.value)}</Typography>
              {typeof stat.trend === 'number' ? (
                <Typography color={stat.trend >= 0 ? 'success.main' : 'error.main'} variant="body2">
                  {stat.trend >= 0 ? '+' : ''}
                  {stat.trend}%
                </Typography>
              ) : null}
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
