import { useMemo, useState } from 'react';
import { Box, Button, CircularProgress, Divider, Stack } from '@mui/material';
import { useLoginInfoQuery } from '../../features/auth/hooks/useLoginInfoQuery';
import {
  ASSETS_QUERY_KEYS,
  useAllExchangesQuery,
  useCrawlerStateQuery,
  useUserExchangesQuery,
} from '../../features/assets/hooks/useAssetsQueries';
import {
  ExchangeMeta,
  PlatformStatus,
  UserExchange,
  categoryLabels,
  flattenExchangeMetas,
  flattenUserExchanges,
  formatUpdatedAt,
} from '../../features/assets/model/types';
import { PlatformList, PlatformListItem, PlatformListSection } from '../../features/assets/ui/PlatformList';
import { AssetsDashboard } from '../../features/assets/ui/AssetsDashboard';
import { ConnectPanel } from '../../features/assets/ui/ConnectPanel';
import { ConnectedPanel } from '../../features/assets/ui/ConnectedPanel';
import { PlatformSelectDialog } from '../../features/assets/ui/PlatformSelectDialog';
import { queryClient } from '../../app/config/queryClient';
import { useAppBarSlot } from '../../app/layout/MainLayout';

type Selection =
  | { kind: 'connected'; key: string }
  | { kind: 'pending'; key: string }
  | { kind: null; key: null };

const buildStatusMap = (items: UserExchange[], crawlerState?: { resultVal: PlatformStatus; deleting: number[]; crawling: number[] }) => {
  const map: Record<number, PlatformStatus> = {};
  const baseStatus = crawlerState?.resultVal ?? 'Normal';
  items.forEach((item) => {
    map[item.seq_user_exchange] = baseStatus;
  });
  crawlerState?.crawling?.forEach((seq) => {
    map[Number(seq)] = 'Crawling';
  });
  crawlerState?.deleting?.forEach((seq) => {
    map[Number(seq)] = 'Deleting';
  });
  return map;
};

const buildSections = (
  connected: UserExchange[],
  pending: ExchangeMeta[],
  statusMap: Record<number, PlatformStatus>,
): PlatformListSection[] => {
  const categories: PlatformListSection[] = [
    { category: 'L', items: [] },
    { category: 'F', items: [] },
    { category: 'W', items: [] },
  ];

  connected.forEach((item) => {
    const section = categories.find((c) => c.category === item.category);
    const listItem: PlatformListItem = {
      key: `connected-${item.seq_user_exchange}`,
      name: item.nickname,
      subtitle: `${item.en_name} · ${categoryLabels[item.category]}`,
      logo: item.logo,
      connected: true,
      status: statusMap[item.seq_user_exchange],
      category: item.category,
    };
    section?.items.push(listItem);
  });

  pending.forEach((item) => {
    const section = categories.find((c) => c.category === item.category);
    const listItem: PlatformListItem = {
      key: `pending-${item.seq}`,
      name: item.en_name,
      subtitle: item.ko_name,
      logo: item.logo,
      connected: false,
      category: item.category,
    };
    section?.items.push(listItem);
  });

  return categories;
};

export const AssetsPage = () => {
  const { data: loginInfo, isLoading: isLoginLoading } = useLoginInfoQuery();
  const session = loginInfo?.encSession;

  const {
    data: userExchangeResponse,
    isLoading: isUserLoading,
    refetch: refetchUserExchanges,
  } = useUserExchangesQuery(session);
  const { data: allExchangeResponse, isLoading: isAllLoading } = useAllExchangesQuery(session);
  const { data: crawlerState } = useCrawlerStateQuery(session);

  const connectedExchanges = useMemo(() => {
    if (!userExchangeResponse?.exchange_list) return [];
    return flattenUserExchanges(userExchangeResponse.exchange_list);
  }, [userExchangeResponse]);

  const allExchanges = useMemo(() => {
    if (!allExchangeResponse?.exchange_list) return [];
    return flattenExchangeMetas(allExchangeResponse.exchange_list);
  }, [allExchangeResponse]);

  const [pendingSelections, setPendingSelections] = useState<ExchangeMeta[]>([]);
  const [selection, setSelection] = useState<Selection>({ kind: null, key: null });
  const [dialogOpen, setDialogOpen] = useState(false);

  const statusMap = useMemo(
    () => buildStatusMap(connectedExchanges, crawlerState),
    [connectedExchanges, crawlerState],
  );

  const selectedConnected = useMemo(() => {
    if (selection.kind !== 'connected' || !selection.key) return null;
    const seq = selection.key.replace('connected-', '');
    return connectedExchanges.find((item) => String(item.seq_user_exchange) === seq) ?? null;
  }, [selection, connectedExchanges]);

  const selectedPending = useMemo(() => {
    if (selection.kind !== 'pending' || !selection.key) return null;
    const seq = selection.key.replace('pending-', '');
    return pendingSelections.find((item) => String(item.seq) === seq) ?? null;
  }, [selection, pendingSelections]);

  const sections = useMemo(
    () => buildSections(connectedExchanges, pendingSelections, statusMap),
    [connectedExchanges, pendingSelections, statusMap],
  );

  const connectedSeqs = useMemo(
    () => connectedExchanges.map((item) => item.seq),
    [connectedExchanges],
  );

  const handleSelect = (item: PlatformListItem) => {
    if (item.connected) {
      setSelection({ kind: 'connected', key: item.key });
    } else {
      setSelection({ kind: 'pending', key: item.key });
    }
  };

  const handleAddPlatforms = (items: ExchangeMeta[]) => {
    setPendingSelections(items);
    if (items.length > 0) {
      setSelection({ kind: 'pending', key: `pending-${items[0].seq}` });
    }
  };

  const handleConnected = () => {
    refetchUserExchanges();
    if (selection.kind === 'pending' && selectedPending) {
      setPendingSelections((prev) => prev.filter((p) => String(p.seq) !== String(selectedPending.seq)));
      setSelection({ kind: null, key: null });
    }
    void queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.crawler(session ?? '') });
  };

  const lastUpdated = useMemo(() => {
    const list = connectedExchanges
      .map((item) => item.updated_at)
      .filter(Boolean)
      .sort()
      .reverse();
    return list[0];
  }, [connectedExchanges]);

  const appBarSlot = useMemo(
    () => ({
      actions: (
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            플랫폼 선택
          </Button>
        </Stack>
      ),
    }),
    [lastUpdated],
  );

  useAppBarSlot(appBarSlot);

  const isLoading = isLoginLoading || isUserLoading || isAllLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (selectedPending && session) {
      return (
        <ConnectPanel
          exchange={selectedPending}
          session={session}
          onConnected={handleConnected}
          onClose={() => setSelection({ kind: null, key: null })}
        />
      );
    }

    if (selectedConnected && session) {
      return (
        <ConnectedPanel
          exchange={selectedConnected}
          status={statusMap[selectedConnected.seq_user_exchange]}
          allExchanges={allExchanges}
          session={session}
          onUpdated={handleConnected}
          onClose={() => setSelection({ kind: null, key: null })}
        />
      );
    }

    return <AssetsDashboard exchanges={connectedExchanges} statusMap={statusMap} />;
  };

  return (
    <Stack spacing={2} sx={{ height: 'calc(100vh - 140px)', border: '1px solid rgba(0, 0, 0, 0.1)',borderRadius: '14px' , overflow:'hidden' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '460px 1fr', height: '100%' }}>
        <PlatformList sections={sections} selectedKey={selection.key ?? undefined} onSelect={handleSelect} />
        <Box sx={{ height: '100%', minHeight: 0 }}>{renderContent()}</Box>
      </Box>
      <PlatformSelectDialog
        open={dialogOpen}
        exchanges={allExchanges}
        connectedSeqs={connectedSeqs}
        onClose={() => setDialogOpen(false)}
        onSelect={handleAddPlatforms}
      />
    </Stack>
  );
};
