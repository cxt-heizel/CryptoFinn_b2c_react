import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { ChartCard } from '../chartPrimitives';
import { RankBar } from '../../model/dashboardData';

type Props = {
  data: RankBar[];
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  label?: string;
  desc?: string;
};

export const RankChart = ({ data, isLoading = false, error = null, onRetry, label, desc }: Props) => {
  const hasData = data.length > 0;

  return (
    <ChartCard id="rank-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="50%" height={18} />
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
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
          <Typography variant="subtitle1">자산 순위를 불러오지 못했습니다.</Typography>
        </Alert>
      ) : hasData ? (
        <>
          <TextBlock title={label || '상위'} desc="내 자산 순위는?" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            {desc || ''}
          </Typography>
          <Box sx={{ position: 'relative', height: 180, mt: 3, px: 2 }}>
            <Stack
              spacing={1.4}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'flex-end',
              }}
            >
              {data.map((bar) => (
                <Box
                  key={bar.key}
                  sx={{
                    height: 32,
                    width: `${bar.width}%`,
                    ml: 'auto',
                    mr: `${bar.offset}%`,
                    borderRadius: '14px 0 0 14px',
                    background: bar.highlight ? 'var(--Color-greyscale-800)' : 'var(--Color-greyscale-300)',
                  }}
                />
              ))}
            </Stack>
          </Box>
        </>
      ) : (
        <Typography color="var(--Color-greyscale-600)">순위 데이터가 없습니다.</Typography>
      )}
    </ChartCard>
  );
};
