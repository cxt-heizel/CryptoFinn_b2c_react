import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, BarChart, Bar, Cell } from 'recharts';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { BestExchangeDatum } from '../../model/dashboardData';
import { AXIS_TICK_STYLE, BAR_CHART_MARGIN, ChartCard, ChartContainer, DEFAULT_BAR_SIZE } from '../chartPrimitives';

type Props = {
  data: BestExchangeDatum[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export const BestExchangeChart = ({ data, isLoading = false, error = null, onRetry }: Props) => {
  const hasData = data.length > 0;
  const topExchange = data[0];
  const displayName = topExchange?.name ?? '거래소';

  return (
    <ChartCard id="best-exchange-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Skeleton variant="text" width="45%" height={32} />
          <Skeleton variant="text" width="60%" height={18} />
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
          <Typography variant="subtitle1">거래소 수익 데이터를 불러오지 못했습니다.</Typography>
        </Alert>
      ) : hasData ? (
        <>
          <TextBlock
            title={displayName}
            desc="지난 해, 소득이 가장 많았던 곳은?"
            size="lg"
            titleFirst={false}
          />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            에서 가장 많이 벌었어요
          </Typography>
          <ChartContainer height={320} sx={{ mt: 3 }}>
            <BarChart data={data} margin={{ ...BAR_CHART_MARGIN, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="var(--Color-greyscale-300)" />
              <XAxis dataKey="name" tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 'dataMax + 200']} />
              <ReferenceLine y={0} stroke="var(--Color-greyscale-400)" strokeDasharray="6 6" />
              <Tooltip cursor={false} />
              <Bar dataKey="value" radius={[14, 14, 0, 0]} barSize={DEFAULT_BAR_SIZE} isAnimationActive={false}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.barColor} />
                ))}
                {/*
                  Recharts LabelList does not allow per-item custom content easily; skip bubble to keep UI simple.
                  The value label is handled via entry.label above.
                */}
              </Bar>
            </BarChart>
          </ChartContainer>
        </>
      ) : (
        <Typography sx={{ mt: 0.8 }} color="var(--Color-greyscale-600)">
          거래소 소득 데이터가 없습니다.
        </Typography>
      )}
    </ChartCard>
  );
};
