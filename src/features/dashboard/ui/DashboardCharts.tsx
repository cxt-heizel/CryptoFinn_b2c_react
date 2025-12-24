import { Grid, Paper, Skeleton, Box, Stack } from '@mui/material';
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
      <Grid container spacing={1.5}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 0.5 }}>
              <Stack sx={{flex:1}}>
                <Skeleton variant="text" width="76%" height={28} />
                <Skeleton variant="text" width="38%" height={16} />
              </Stack>
              <Stack sx={{flex:1, display:'flex', alignItems:'flex-end'}}>
                <Skeleton variant="text" width="76%" height={28} />
                <Skeleton variant="text" width="38%" height={16} />  
              </Stack>
            </Box>
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
