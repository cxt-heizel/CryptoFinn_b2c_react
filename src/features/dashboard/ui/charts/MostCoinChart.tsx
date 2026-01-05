import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { Pie, PieChart, Cell } from 'recharts';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { ChartCard, ChartContainer } from '../chartPrimitives';
import { MostCoinDatum } from '../../model/dashboardData';

type Props = {
  data: MostCoinDatum[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export const MostCoinChart = ({ data, isLoading = false, error = null, onRetry }: Props) => {
  const hasData = data.length > 0;
  const top = data[0];

  return (
    <ChartCard id="most-coin-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Skeleton variant="text" width="55%" height={32} />
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
        </Stack>
      ) : error ? (
        <Alert
          severity="error"
          action={
            onRetry ? (
              <AppButton color="inherit" size="small" onClick={onRetry}>
                다시 시도
              </AppButton>
            ) : undefined
          }
        >
          <Typography variant="subtitle1">보유 자산 데이터를 불러오지 못했습니다.</Typography>
        </Alert>
      ) : hasData ? (
        <>
          <TextBlock
            title={top?.name ?? '자산'}
            desc="지금, 가장 많이 보유한 자산은?"
            size="lg"
            titleFirst={false}
          />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            전체 자산 중 {top.value ?? 0}%
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ChartContainer height={240} sx={{ position: 'relative' }}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="65%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  startAngle={170}
                  endAngle={-190}
                  cornerRadius={12}
                  paddingAngle={2}
                  isAnimationActive={false}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <Stack direction="column" spacing={1.2} sx={{ pl: 0.5 }}>
              {data.map((item) => (
                <Stack key={item.name} direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                  <Typography sx={{ flex: 1 }} color="var(--Color-greyscale-800)">
                    {item.name}
                  </Typography>
                  <Typography color="var(--Color-greyscale-800)" fontWeight={600}>
                    {item.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </>
      ) : (
        <Typography color="var(--Color-greyscale-600)">보유 자산 데이터가 없습니다.</Typography>
      )}
    </ChartCard>
  );
};
