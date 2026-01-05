import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { ChartCard } from '../chartPrimitives';
import { FavoriteDatum, NicknameItem } from '../../model/dashboardData';


type Props = {
  data: FavoriteDatum | null;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

type ExchangeUsage = {
  name: string;
  count: number;
  ratio: number;
};

const useExchangeUsage = (favorite: FavoriteDatum | null): ExchangeUsage | null =>
  useMemo(() => {
    if (!favorite) return null;

    const { list, nickname } = favorite;
    if (!list) return null;

    const targetSeq = list.name?.ko;
    const matchedNickname: NicknameItem | undefined = nickname?.find?.(
      (item) => item.seq === targetSeq,
    );

    const displayName =
      matchedNickname?.ko_name ??
      matchedNickname?.nickname ??
      matchedNickname?.en_name ??
      (typeof targetSeq === 'string' ? targetSeq : '');

    const count = Number.isFinite(list.count) ? list.count : 0;
    let ratio = Number.isFinite(list.ratio) ? Math.floor(list.ratio) : 0;

    return {
      name: displayName || '알 수 없음',
      count,
      ratio,
    };
  }, [favorite]);

const formatNumber = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

export const FavoriteChart = ({
  data,
  isLoading = false,
  error = null,
  onRetry,
}: Props) => {
  const exchangeUsage = useExchangeUsage(data);
  const clampedRatio = Math.min(Math.max(exchangeUsage?.ratio ?? 0, 0), 100);
  const ratioAngle = (clampedRatio / 100) * 360;

  return (
    <ChartCard id="favorite-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Stack spacing={0}>
            <Typography variant="subtitle1" color="var(--Color-greyscale-600)" sx={{ lineHeight: 1 }}>
              내 최애 거래소는?
            </Typography>
            <Skeleton variant="text" width="35%" height={40} />
            <Skeleton variant="text" width="28%" height={21} />
          </Stack>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
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
          <Typography variant="subtitle1">즐겨찾기 거래소를 불러오지 못했습니다.</Typography>
        </Alert>
      ) : exchangeUsage ? (
        <>
          <TextBlock
            title={exchangeUsage.name}
            desc="내 최애 거래소는?"
            size="lg"
            titleFirst={false}
          />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            전체 거래 중 {clampedRatio}% · {formatNumber(exchangeUsage.count)}건
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: `conic-gradient(var(--Color-greyscale-900) 0deg ${ratioAngle}deg, var(--Color-greyscale-200) ${ratioAngle}deg 360deg)`,
                boxShadow: '0 14px 30px rgba(0,0,0,0.12)',
                display: 'grid',
                placeItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 40,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 55%), var(--Color-background-default, #fff)',
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 36,
                  borderRadius: '50%',
                  background: 'var(--Color-background-default, #fff)',
                  display: 'grid',
                  placeItems: 'center',
                  gap: 0.5,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" component="div" color="var(--Color-greyscale-1000)">
                  {clampedRatio}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Typography sx={{ mt: 0.8 }} color="var(--Color-greyscale-600)">
          즐겨찾기 거래소 데이터가 없습니다.
        </Typography>
      )}
    </ChartCard>
  );
};
