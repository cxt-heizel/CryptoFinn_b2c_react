import { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { Resizable } from 're-resizable';
import styled from '@emotion/styled';
import { AnalysisPanel } from '../../features/dashboard/ui/AnalysisPanel';
import { DashboardScrollArea } from '../../features/dashboard/ui/DashboardScrollArea';
import { useLoginInfoQuery } from '../../features/auth/hooks/useLoginInfoQuery';
import {
  useDashboardBalancesQuery,
  useDashboardExchangeQuery,
  useDashboardFavoriteQuery,
  useDashboardIncomeQuery,
  useDashboardYearlyQuery,
} from '../../features/dashboard/hooks/useDashboardSummaryQuery';
import {
  BestExchangeDatum,
  MostCoinDatum,
  RankBar,
  YearlyDatum,
} from '../../features/dashboard/model/dashboardData';
import { useElementWidth } from '../../shared/hooks/useElementWidth';
import { AssetOverviewPanel } from '../../features/dashboard/ui/AssetOverviewPanel';

export const DashboardPage = () => {
  const [isResizing, setIsResizing] = useState(false);
  const { data: loginInfo, isLoading: isLoginInfoLoading } = useLoginInfoQuery();
  const currentYear = '2024';

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

  const {
    data: balancesData = [],
    isLoading: isBalancesLoading,
    isError: isBalancesError,
    error: balancesError,
    refetch: refetchBalances,
  } = useDashboardBalancesQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const {
    data: exchangeData,
    isLoading: isExchangeLoading,
    isError: isExchangeError,
    error: exchangeError,
    refetch: refetchExchange,
  } = useDashboardExchangeQuery(
    { year: currentYear, session: loginInfo?.encSession },
    { enabled: Boolean(currentYear && loginInfo?.encSession) },
  );

  const { ref: analysisRef, width: analysisWidth } = useElementWidth<HTMLDivElement>({ debounceMs: 120 });
  const isWideAnalysis = analysisWidth > 532;

  const transactions = useMemo<YearlyDatum[]>(() => {
    if (!Array.isArray(yearlyData)) return [];
    return yearlyData
      .map((item: any) => {
        const year = item.year ?? item?.y ?? item?.yearly ?? item?.date ?? '';
        const count = Number(item.count ?? item.total_count ?? item.cnt ?? item.value ?? 0);
        const amount = Number(item.amount ?? item.total_income ?? 0);
        return year ? { year: String(year), count, amount } : null;
      })
      .filter(Boolean) as YearlyDatum[];
  }, [yearlyData]);

  const bestExchanges = useMemo<BestExchangeDatum[]>(() => {
    const list = Array.isArray(exchangeData?.list) ? exchangeData.list : [];
    const nicknames = Array.isArray(exchangeData?.nicknames) ? exchangeData.nicknames : [];

    const findNicknameBySeq = (seq: string | number | undefined) => {
      if (seq === undefined || seq === null) return null;
      return nicknames.find((n: any) => String(n.seq) === String(seq)) ?? null;
    };

    const resolveName = (item: any, fallback: string) => {
      // In sample: name = { ko: "4107", en: "4107" }, nickname_list has seq=4107
      const nameObj = item.name;
      const seq = nameObj?.ko ?? nameObj?.en ?? item.seq ?? item.exchange_seq ?? item.user_id;
      const matched = findNicknameBySeq(seq);
      if (matched) {
        return matched.nickname ?? matched.ko_name ?? matched.en_name ?? fallback;
      }
      if (typeof nameObj === 'object') {
        return nameObj.ko ?? nameObj.en ?? fallback;
      }
      const rawName = item.ko_name ?? item.en_name ?? item.exchange ?? item.name;
      if (typeof rawName === 'object') {
        return rawName.ko ?? rawName.en ?? fallback;
      }
      return rawName ?? String(seq ?? fallback);
    };

    return list.slice(0, 4).map((item: any, index: number) => {
      const resolved = resolveName(item, '');
      const name =
        typeof resolved === 'string' && resolved.trim()
          ? resolved.trim()
          : `거래소${index + 1}`;
      const income = Number(item.amount ?? item.total_income ?? item.total ?? item.income ?? item.value ?? 0);
      return {
        name,
        value: income,
        label: new Intl.NumberFormat('ko-KR').format(income) + '원',
        barColor: index === 0 ? 'var(--Color-greyscale-800)' : 'var(--Color-greyscale-300)',
        showBubble: index === 0,
      };
    });
  }, [exchangeData]);

  const topHoldings = useMemo<MostCoinDatum[]>(() => {
    if (!Array.isArray(balancesData)) return [];
    return balancesData.slice(0, 5).map((item: any, index: number) => {
      const rawName = item.ko_name ?? item.en_name ?? item.coin ?? item.name;
      const name =
        typeof rawName === 'object'
          ? rawName?.ko ?? rawName?.en ?? rawName?.ko_name ?? rawName?.en_name ?? `자산${index + 1}`
          : rawName ?? `자산${index + 1}`;
      const ratio = Number(item.ratio ?? item.weight ?? item.value ?? 0);
      const colors = ['var(--Color-greyscale-700)', 'var(--Color-greyscale-800)', 'var(--Color-greyscale-600)', 'var(--Color-greyscale-500)', 'var(--Color-greyscale-400)'];
      return {
        name: String(name),
        value: Math.max(0, Math.floor(ratio)),
        color: colors[index % colors.length],
      };
    });
  }, [balancesData]);

  const { rankBars, rankLabel, rankDesc } = useMemo(() => {
    const list = Array.isArray(balancesData) ? balancesData : [];
    const totalAmount = list.reduce((sum: number, item: any) => sum + Number(item.amount ?? 0), 0);
    const rankSys: Record<
      string,
      { percent: string; desc: string }
    > = {
      rank01: { percent: '상위 0.02%', desc: '최상위 고액 자산가에요' },
      rank02: { percent: '상위 0.7%', desc: '최상위 자산가에요' },
      rank03: { percent: '상위 8.0%', desc: '상위 자산가에요' },
      rank04: { percent: '상위 12.7%', desc: '보통 자산가에요' },
      rank05: { percent: '하위 42.8%', desc: '소액 거래자에요' },
      rank06: { percent: '하위 33.3%', desc: '소액 거래자에요' },
      unranked: { percent: '하위 8.5%', desc: ' ' },
    };

    const rankUserAsset = (amount: number) => {
      if (amount === 0) return 'unranked';
      if (amount < 1_000_000) return 'rank06';
      if (amount < 5_000_000) return 'rank05';
      if (amount < 10_000_000) return 'rank04';
      if (amount < 100_000_000) return 'rank03';
      if (amount < 1_000_000_000) return 'rank02';
      return 'rank01';
    };

    const rankKey = rankUserAsset(totalAmount);

    const bars: RankBar[] = [
      { key: 'rank01', width: 6, offset: 4, highlight: false },
      { key: 'rank02', width: 14, offset: 8, highlight: false },
      { key: 'rank03', width: 39, offset: 12, highlight: false },
      { key: 'rank04', width: 53, offset: 18, highlight: false },
      { key: 'rank05', width: 100, offset: 10, highlight: false },
      { key: 'rank06', width: 44, offset: 6, highlight: false },
      { key: 'unranked', width: 82, offset: 22, highlight: false },
    ].map((bar) => ({
      ...bar,
      highlight: bar.key === rankKey,
    }));

    const info = rankSys[rankKey] ?? { percent: '상위', desc: '' };

    return { rankBars: bars, rankLabel: info.percent, rankDesc: info.desc };
  }, [balancesData]);

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
            yearly={transactions as YearlyDatum[]}
            yearlyLoading={isYearlyLoading || isLoginInfoLoading}
            yearlyError={isYearlyError ? yearlyError : null}
            onRefetchYearly={refetchYearly}
            income={incomeData ?? null}
            incomeLoading={isIncomeLoading || isLoginInfoLoading}
            incomeError={isIncomeError ? incomeError : null}
            onRefetchIncome={refetchIncome}
            favorite={favoriteData ?? null}
            FavoriteLoading={isFavoriteLoading || isLoginInfoLoading}
            favoriteError={isFavoriteError ? favoriteError : null}
            refetchFavorite={refetchFavorite}
            bestExchanges={bestExchanges}
            bestExchangesLoading={isExchangeLoading || isLoginInfoLoading}
            bestExchangesError={isExchangeError ? exchangeError : null}
            onRefetchBestExchanges={refetchExchange}
            topHoldings={topHoldings}
            topHoldingsLoading={isBalancesLoading || isLoginInfoLoading}
            topHoldingsError={isBalancesError ? balancesError : null}
            onRefetchTopHoldings={refetchBalances}
            ranks={rankBars}
            ranksLoading={isBalancesLoading || isLoginInfoLoading}
            ranksError={isBalancesError ? balancesError : null}
            rankLabel={rankLabel}
            rankDesc={rankDesc}
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
