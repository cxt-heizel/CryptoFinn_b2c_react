import { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { Resizable } from 're-resizable';
import { AnalysisPanel } from '../../features/dashboard/ui/AnalysisPanel';
import { AssetOverviewPanel } from '../../features/dashboard/ui/AssetOverviewPanel';
import { DashboardScrollArea } from '../../features/dashboard/ui/DashboardScrollArea';
import { dashboardMockData } from '../../features/dashboard/model/dashboardData';
import { useDashboardStatsQuery } from '../../features/dashboard/hooks/useDashboardStatsQuery';
import { useElementWidth } from '../../shared/hooks/useElementWidth';

export const DashboardPage = () => {
  const { data: remoteStats = [], isLoading } = useDashboardStatsQuery();
  const [isResizing, setIsResizing] = useState(false);
  const { ref: analysisRef, width: analysisWidth } = useElementWidth<HTMLDivElement>();

  const {
    assetStats,
    summaryStats,
    transactionChartData,
    incomeChartData,
    favoriteChartData,
    bestExchangeData,
    mostCoinData,
    rankBars,
  } = dashboardMockData;

  const stats = remoteStats.length ? remoteStats : assetStats;
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
            stats={stats}
            summaryStats={summaryStats}
            updatedLabel="2023.08.28  23:12 기준"
            onDownload={handleDownload}
            assetCount={11}
            isLoading={isLoading}
          />
        </DashboardScrollArea>
      </Resizable>
      <Box sx={{ flex: 1, minWidth: 380, minHeight: 0 }} ref={analysisRef}>
        <DashboardScrollArea>
          <AnalysisPanel
            isWide={isWideAnalysis}
            transactions={transactionChartData}
            income={incomeChartData}
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
