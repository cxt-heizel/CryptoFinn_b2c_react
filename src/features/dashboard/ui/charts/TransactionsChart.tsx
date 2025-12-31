import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { YearlyDatum } from '../../model/dashboardData';
import { AXIS_TICK_STYLE, ChartCard, ChartContainer, LINE_CHART_MARGIN } from '../chartPrimitives';

type Props = {
  yearly: YearlyDatum[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export const TransactionsChart = ({
  yearly,
  isLoading = false,
  error = null,
  onRetry,
}: Props) => {
  const hasTransactions = yearly.length > 0;
  const totalCount = hasTransactions ? yearly.reduce((sum, el) => sum + el.count, 0) : 0;
  const lowestYear = hasTransactions
    ? yearly.reduce((min, el) => (min.count > el.count ? el : min), yearly[0]).year
    : '';
  const highestYear = hasTransactions
    ? yearly.reduce((max, el) => (max.count < el.count ? el : max), yearly[0]).year
    : '';

  return (
    <ChartCard id="transactions-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Stack spacing={0}>
            <Typography variant="subtitle1" color="var(--Color-greyscale-600)" sx={{ lineHeight: 1 }}>
              수집된 거래내역
            </Typography>
            <Skeleton variant="text" width="23%" height={40} />
            <Skeleton variant="text" width="33%" height={21} />
          </Stack>
          <Skeleton variant="rectangular" height={232} sx={{ borderRadius: 2 }} />
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
          <Typography variant="subtitle1">연간 거래내역을 불러오지 못했습니다.</Typography>
        </Alert>
      ) : hasTransactions ? (
        <>
          <TextBlock title={`${totalCount}건`} desc="수집된 거래내역" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            최저 {lowestYear}년 | 최고 {highestYear}년
          </Typography>
          <ChartContainer height={260}>
            <LineChart data={yearly} margin={LINE_CHART_MARGIN}>
              <CartesianGrid strokeDasharray="4 6" stroke="var(--Color-greyscale-300)" />
              <XAxis dataKey="year" tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={false} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--Color-greyscale-600)"
                strokeWidth={2}
                dot
                activeDot
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>
        </>
      ) : (
        <Typography sx={{ mt: 0.8 }} color="var(--Color-greyscale-600)">
          표시할 거래내역이 없습니다.
        </Typography>
      )}
    </ChartCard>
  );
};
