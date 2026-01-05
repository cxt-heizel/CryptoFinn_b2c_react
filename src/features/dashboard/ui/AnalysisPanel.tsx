import { Children, ReactNode } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { TransactionsChart } from './charts/TransactionsChart';
import {
  YearlyDatum,
  BestExchangeDatum,
  MostCoinDatum,
  RankBar,
  IncomeDatum,
  FavoriteDatum,
} from '../model/dashboardData';
import { SectionTitle } from './SectionTitle';
import { IncomeChart } from './charts/IncomeChart';
import { FavoriteChart } from './charts/favoriteChart';
import { BestExchangeChart } from './charts/BestExchangeChart';
import { MostCoinChart } from './charts/MostCoinChart';
import { RankChart } from './charts/RankChart';

type Props = {
  isWide: boolean;
  yearly : YearlyDatum[];
  yearlyLoading?: boolean;
  yearlyError?: unknown;
  onRefetchYearly?: () => void;
  income : IncomeDatum | null ;
  incomeLoading?: boolean;
  incomeError?: unknown;
  onRefetchIncome?: () => void;
  favorite : FavoriteDatum | null ;
  FavoriteLoading : boolean;
  favoriteError : unknown;
  refetchFavorite : () => void;
  bestExchanges: BestExchangeDatum[];
  bestExchangesLoading?: boolean;
  bestExchangesError?: unknown;
  onRefetchBestExchanges?: () => void;
  topHoldings: MostCoinDatum[];
  topHoldingsLoading?: boolean;
  topHoldingsError?: unknown;
  onRefetchTopHoldings?: () => void;
  ranks: RankBar[];
  ranksLoading?: boolean;
  ranksError?: unknown;
  onRefetchRanks?: () => void;
};

const SplitSection = ({ isWide, children }: { isWide: boolean; children: ReactNode }) => {
  const nodes = Children.toArray(children);
  const first = nodes[0] ?? null;
  const second = nodes[1] ?? null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isWide ? 'row' : 'column',
        alignItems: 'stretch',
      }}
    >
      {first}
      <Divider
        orientation={isWide ? 'vertical' : 'horizontal'}
        flexItem
        sx={isWide ? undefined : { my: 0.5 }}
      />
      {second}
    </Box>
  );
};

export const AnalysisPanel = ({
  isWide,
  yearly,
  yearlyLoading = false,
  yearlyError = null,
  onRefetchYearly,
  income,
  incomeLoading = false,
  incomeError = null,
  onRefetchIncome,
  favorite,
  FavoriteLoading = false,
  favoriteError = null,
  refetchFavorite,
  transactions,
  favorites,
  bestExchanges,
  bestExchangesLoading = false,
  bestExchangesError = null,
  onRefetchBestExchanges,
  topHoldings,
  topHoldingsLoading = false,
  topHoldingsError = null,
  onRefetchTopHoldings,
  ranks,
  ranksLoading = false,
  ranksError = null,
  onRefetchRanks,
  rankLabel,
  rankDesc,
}: Props) => {

  console.log( bestExchanges );

  return (
    <Box>
      <Box sx={{ bgcolor: 'var(--Color-greyscale-000)' }}>
        <SectionTitle>
          <Box>
            <Typography variant="h3" color="var(--Color-greyscale-1000)">
              분석
            </Typography>
          </Box>
        </SectionTitle>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          rowGap: 0,
          px: 0,
          py: isWide ? 2 : 1.5,
        }}
      >
        <TransactionsChart
          yearly={yearly}
          isLoading={yearlyLoading}
          error={yearlyError}
          onRetry={onRefetchYearly}
        />
        <Divider />
        <IncomeChart
          income={income}
          isLoading={incomeLoading}
          error={incomeError}
          onRetry={onRefetchIncome}
        />
        <FavoriteChart
          data={favorite}
          isLoading={FavoriteLoading}
          error={favoriteError}
          onRetry={refetchFavorite}
        />
        <Divider />
        <SplitSection isWide={isWide}>
          <BestExchangeChart
            data={bestExchanges}
            isLoading={bestExchangesLoading}
            error={bestExchangesError}
            onRetry={onRefetchBestExchanges}
          />
          <MostCoinChart
            data={topHoldings}
            isLoading={topHoldingsLoading}
            error={topHoldingsError}
            onRetry={onRefetchTopHoldings}
          />
        </SplitSection>
        <Divider />
        <RankChart
          data={ranks}
          isLoading={ranksLoading}
          error={ranksError}
          onRetry={onRefetchRanks}
          label={rankLabel}
          desc={rankDesc}
        />
      </Box>
    </Box>
  );
};
