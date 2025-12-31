import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Resizable } from 're-resizable';
import { AnalysisPanel } from '../../features/dashboard/ui/AnalysisPanel';
import { AssetOverviewPanel } from '../../features/dashboard/ui/AssetOverviewPanel';
import { DashboardScrollArea } from '../../features/dashboard/ui/DashboardScrollArea';
import { dashboardMockData } from '../../features/dashboard/model/dashboardData';
import { useLoginInfoQuery } from '../../features/auth/hooks/useLoginInfoQuery';
import { useDashboardBalancesQuery, useDashboardExchangeQuery, useDashboardFavoriteQuery, useDashboardIncomeQuery, useDashboardYearlyQuery } from '../../features/dashboard/hooks/useDashboardSummaryQuery';
// import { useDashboardStatsQuery } from '../../features/dashboard/hooks/useDashboardStatsQuery';
import { useElementWidth } from '../../shared/hooks/useElementWidth';

export const DashboardPage = () => {
  const { data: loginInfo, isLoading: isLoginInfoLoading } = useLoginInfoQuery();
  // const { data: remoteStats = [], isLoading: isStatsLoading } = useDashboardStatsQuery();
  const currentYear = new Date().getFullYear().toString();
  
  const {
    data: yearlyData,
    isLoading: isYearlyLoading,
    isError: isYearlyError,
    error: yearlyError,
    refetch: refetchYearly,
  } = useDashboardYearlyQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const {
    data: incomeData,
    isLoading: isIncomeLoading,
    isError: isIncomeError,
    error: incomeError,
    refetch: refetchIncome,
  } = useDashboardIncomeQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );


  const {
    data: favoriteData,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
    error: favoriteError,
    refetch: refetchFavorite,
  } = useDashboardFavoriteQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const { data: balancesData = [], isLoading: isBalancesLoading } = useDashboardBalancesQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const { data: exchangeData = [], isLoading:ExchangeLoading } = useDashboardExchangeQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const [isResizing, setIsResizing] = useState(false);
  const { ref: analysisRef, width: analysisWidth } = useElementWidth<HTMLDivElement>({ debounceMs: 120 });


  const {
    assetStats,
    summaryStats,
    favoriteChartData,
    transactionChartData,
    bestExchangeData,
    mostCoinData,
    rankBars,
  } = dashboardMockData;

  // const stats = remoteStats.length ? remoteStats : assetStats;
  // const updatedLabel = summaryData?.more?.collection_period
  //   ? `${summaryData.more.collection_period}`
  //   : '2023.08.28  23:12 기준';
  // const assetCount = summaryData?.more?.list?.length ?? 11;
  const isWideAnalysis = analysisWidth > 532;

  const handleDownload = useCallback((format: string) => {
    alert(`다운로드: ${format}`);
  }, []);



  return (
    <Box sx={{ display: 'flex', gap: '12px', height: 'calc(100vh - 108px)', minHeight: 0 }}>
      <Resizable
        defaultSize={{ width: '70%', height: '100%' }}
        minWidth={950}
        maxWidth="calc(100% - 380px - 8px)"
        enable={{ right: true }}
        bounds="parent"
        handleComponent={{ right: <ResizeHandle $active={isResizing} /> }}
        onResizeStart={() => setIsResizing(true)}
        onResizeStop={() => setIsResizing(false)}
        style={{ minHeight: 0 }}
      >
        <DashboardScrollArea>
          <AssetOverviewPanel
            stats={[]}
            summaryStats={[]}
            onDownload={handleDownload}
            // assetCount={assetCount}
            isLoading={isLoginInfoLoading}
          />
        </DashboardScrollArea>
      </Resizable>
      <Box sx={{ flex: 1, minWidth: 380, minHeight: 0 }} ref={analysisRef}>
        <DashboardScrollArea>
          <AnalysisPanel
            isWide={isWideAnalysis}
            yearly={yearlyData ?? []}
            yearlyLoading={isYearlyLoading}
            yearlyError={isYearlyError ? yearlyError : null}
            onRefetchYearly={refetchYearly}
            income={incomeData ?? null}
            incomeLoading={isIncomeLoading}
            incomeError={isIncomeError ? incomeError : null}
            onRefetchIncome={refetchIncome}
            favorite = {favoriteData ?? null}
            FavoriteLoading={isFavoriteLoading}
            favoriteError={isFavoriteError ? favoriteError : null}
            refetchFavorite={refetchFavorite}
            transactions={transactionChartData}
            favorites={favoriteChartData}
            bestExchanges={bestExchangeData}
            topHoldings={mostCoinData}
            ranks={rankBars}
          />
        </DashboardScrollArea>
      </Box>
    </Box>
  );
};

const ResizeHandle = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 0;
  right: -3px;
  width: 4px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  background: transparent;
  transition: opacity 160ms ease-out;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      var(--Color-greyscale-300) 10%,
      var(--Color-greyscale-300) 90%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 160ms ease-out;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;
