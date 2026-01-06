import { Fragment } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  categoryLabels,
  PlatformCategory,
  PlatformStatus,
  statusBadges,
  UserExchange,
  formatUpdatedAt,
} from '../model/types';

type Props = {
  exchanges: UserExchange[];
  statusMap: Record<number, PlatformStatus>;
};

const ASSET_COLUMNS = ['KRW', 'USD', 'BTC', 'SEI', 'AED', 'BNB', 'ETH', 'ICP', 'TRX'];

const groupByCategory = (items: UserExchange[]) => {
  return items.reduce<Record<PlatformCategory, UserExchange[]>>(
    (acc, cur) => {
      acc[cur.category] = acc[cur.category] ? [...acc[cur.category], cur] : [cur];
      return acc;
    },
    { L: [], F: [], W: [] },
  );
};

const formatNumber = (value?: number | null) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('ko-KR').format(value);
};

const formatAmountLabel = (value?: number | string | null) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'number') return formatNumber(value);
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return '—';
};

const getAssetDisplay = (item: UserExchange, code: string) => {
  const raw = (item as Record<string, unknown>)[code];
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const asset = raw as { krw?: number | string; usd?: number | string };
    return {
      top: formatAmountLabel(asset.krw),
      bottom: asset.usd ? formatAmountLabel(asset.usd) : '',
    };
  }
  return {
    top: formatAmountLabel(raw as number | string | null),
    bottom: '',
  };
};

export const AssetsDashboard = ({ exchanges, statusMap }: Props) => {
  const grouped = groupByCategory(exchanges);
  const lastUpdated = exchanges
    .map((e) => e.updated_at)
    .filter(Boolean)
    .sort()
    .reverse()[0];
  const totalAmountLabel = '940,520원';

  return (
    <Stack sx={{ height: '100%', bgcolor: 'var(--Color-greyscale-000)' }}>
      <Box
        sx={{
          px: 3,
          bgcolor: 'white',
          borderBottom: '1px solid var(--Color-greyscale-300)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{height:70}}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="h4">데이터 연결 현황</Typography>
            {lastUpdated ? (
              <Chip size="small" label={`업데이트 ${formatUpdatedAt(lastUpdated)}`} />
            ) : null}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={1}>
            <Chip size="small" label="이용중플랜" color="success" variant="outlined" />
            <Chip size="small" label="ULTRA" variant="outlined" />
            <Chip size="small" label={`등록거래 ${exchanges.length}건`} variant="outlined" />
            <Chip size="small" label={`연결플랫폼 ${exchanges.length}개`} variant="outlined" />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              총액
            </Typography>
            <Typography variant="subtitle1">{totalAmountLabel}</Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{display:'grid', gridTemplateColumns:'1fr 200px'}}>      
        {(['L', 'F', 'W'] as PlatformCategory[]).map((category) => {
          const list = grouped[category];
          const colSpan = ASSET_COLUMNS.length + 3;
          return (
            <>
            <TableContainer
              component={Box}
            >
              <Table>
                  <TableHead >
                    <TableRow sx={{height:48}}>
                      {ASSET_COLUMNS.map((code) => (
                        <TableCell
                          key={code}
                          align="left"
                          sx={{ height: 48, width: 120, bgcolor: 'var(--Color-greyscale-050)', fontWeight: 600, px:2.5, py:0 }}
                        >
                          {code}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>  
                    <Fragment key={category}>
                      {list.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={colSpan}>
                            <Typography variant="body2" color="text.secondary">
                              연결된 {categoryLabels[category]}가 없어요.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        list.map((item) => {
                          const status = statusMap[item.seq_user_exchange];
                          const badge = status ? statusBadges[status] : undefined;
                          const tradeCount = item.connect_cnt ?? item.sub_accounts?.length ?? 0;
                          const total = formatAmountLabel(
                            ((item as Record<string, unknown>).total_amount ??
                              (item as Record<string, unknown>).total) as number | string | null,
                          );
                          return (
                            <TableRow key={item.seq_user_exchange} hover>
                              {ASSET_COLUMNS.map((code) => {
                                const asset = getAssetDisplay(item, code);
                                return (
                                  <TableCell key={code} align="center">
                                    <Stack spacing={0.25} alignItems="center">
                                      <Typography variant="body2" fontWeight={600}>
                                        {asset.top}
                                      </Typography>
                                      {asset.bottom ? (
                                        <Typography variant="caption" color="text.secondary">
                                          {asset.bottom}
                                        </Typography>
                                      ) : null}
                                    </Stack>
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                      )}
                    </Fragment>
                  </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table>
                  <TableHead>
                    <TableRow sx={{height:48}}>
                      <TableCell
                          align="right"
                          sx={{ height: 48, width: 120, bgcolor: 'var(--Color-greyscale-050)', fontWeight: 600, px:2.5, py:0 }}
                        >
                          총액
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Fragment key={category}>
                    {list.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={colSpan}>
                            <Typography variant="body2" color="text.secondary">
                              연결하기
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        list.map((item) => {
                          const tradeCount = item.connect_cnt ?? item.sub_accounts?.length ?? 0;
                          const total = formatAmountLabel(
                            ((item as Record<string, unknown>).total_amount ??
                              (item as Record<string, unknown>).total) as number | string | null,
                          );
                          return (
                            <TableRow key={item.seq_user_exchange} hover>
                              <TableCell align="right">
                                <Typography variant="body1" fontWeight={600}>
                                  {total}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </Fragment>
                  </TableBody>
              </Table>
            </TableContainer>
          </>
          );
        })}
      </Box>
    </Stack>
  );
};
