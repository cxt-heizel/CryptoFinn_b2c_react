import { Grid,  Paper, Skeleton, Box } from '@mui/material';
import { formatNumber } from '../../../shared/lib/number';
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
            <ItemBlock title='비트코인' desc='BTC' avatarUrl='https://wiki1.kr/images/thumb/5/5c/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8_%EB%A1%9C%EA%B3%A0.png/200px-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8_%EB%A1%9C%EA%B3%A0.png'>
              <TextBlock title={stat.label} desc={stat.value} align='right'></TextBlock>
            </ItemBlock>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
