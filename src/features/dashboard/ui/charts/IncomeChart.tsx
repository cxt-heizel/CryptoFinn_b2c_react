import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { TextBlock } from '../../../../shared/ui/TextBlock';
import { AppButton } from '../../../../shared/ui/AppButton';
import { IncomeDatum } from '../../model/dashboardData';
import { ChartCard } from '../chartPrimitives';

type Props = {
  income: IncomeDatum | null;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export const IncomeChart = ({
  income,
  isLoading = false,
  error = null,
  onRetry,
}: Props) => {

  const hasIncome = income !== null;

  const totalIncome = hasIncome
    ? new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(income.total)
    : '0';

  const minIncomeAmount = hasIncome ? income.min_income : 0;
  const maxIncomeAmount = hasIncome ? income.max_income : 0;
  const topAmount = Math.max(maxIncomeAmount, minIncomeAmount);

  const formatWon = (value: number) => {
    const floored = Math.floor(value);
    return `${new Intl.NumberFormat('ko-KR').format(floored)}원`;
  };

  const getBarHeightPercent = (value: number) =>
    topAmount > 0 && value > 0 ? Math.floor((value / topAmount) * 100) : 0;

  const minBarHeight = getBarHeightPercent(minIncomeAmount);
  const maxBarHeight = getBarHeightPercent(maxIncomeAmount);

  const renderBar = ({
    label,
    amount,
    year,
    color,
    heightPercent,
  }: {
    label: string;
    amount: number;
    year?: number;
    color: string;
    heightPercent: number;
  }) => (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: 0,
        maxWidth: 150,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      }}
    >
      
      <Box
        sx={{
          m: 0.5,
          mb: 5,
          height: 220,
          background: 'var(--Color-greyscale-100)',
          px: 1,
          display: 'flex',
          gap: 1,
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <Typography variant="subtitle1" color="var(--Color-greyscale-1000)" sx={{ lineHeight: 1.3, textAlign:'center' }}>
          {formatWon(amount)}
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: `${heightPercent}%`,
            minHeight: heightPercent > 0 ? 12 : 0,
            borderRadius: '10px 10px 0 0 ',
            background: color,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            transition: 'height 180ms ease-out',
            boxShadow: heightPercent > 0 ? '0 8px 16px rgba(0,0,0,0.08)' : 'none',
          }}
        >
        </Box>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: 'var(--Color-greyscale-800)',
            position: 'absolute',
            bottom: -30,
            left: 'calc(50% - 20px)'
          }}
        >
          {year ? `${year}년` : '???년'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <ChartCard id="income-chart">
      {isLoading ? (
        <Stack spacing={3}>
          <Stack spacing={0}>
            <Typography variant="subtitle1" color="var(--Color-greyscale-600)" sx={{ lineHeight: 1 }}>
              지금까지의 총 소득은?
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
          <Typography variant="subtitle1">연간 소득 데이터를 불러오지 못했습니다.</Typography>
        </Alert>
      ) : hasIncome ? (
        <>
          <TextBlock title={`${totalIncome}원`} desc="지금까지의 총 소득은?" size="lg" titleFirst={false} />
          <Typography sx={{ mt: 0.8 }} variant="body1" color="var(--Color-greyscale-1000)">
            최저 {income.min_income_year}년 | 최고 {income.max_income_year}년
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'flex-end', justifyContent: 'flex-end', height:235}}>
            {renderBar({
              label: '최저소득',
              amount: minIncomeAmount,
              year: income.min_income_year,
              color: 'var(--Color-greyscale-400)',
              heightPercent: minBarHeight,
            })}
            {renderBar({
              label: '최고소득',
              amount: maxIncomeAmount,
              year: income.max_income_year,
              color: 'var(--Color-greyscale-800)',
              heightPercent: maxBarHeight || (maxIncomeAmount > 0 ? 100 : 0),
            })}
          </Box>
        </>
      ) : (
        <Typography sx={{ mt: 0.8 }} color="var(--Color-greyscale-600)">
          표시할 거래내역이 없습니다.
        </Typography>
      )}
    </ChartCard>
  );
};
