import { Box, Card, Chip, Divider, Stack, Typography } from '@mui/material';
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

const groupByCategory = (items: UserExchange[]) => {
  return items.reduce<Record<PlatformCategory, UserExchange[]>>(
    (acc, cur) => {
      acc[cur.category] = acc[cur.category] ? [...acc[cur.category], cur] : [cur];
      return acc;
    },
    { L: [], F: [], W: [] },
  );
};

export const AssetsDashboard = ({ exchanges, statusMap }: Props) => {
  const grouped = groupByCategory(exchanges);
  const lastUpdated = exchanges
    .map((e) => e.updated_at)
    .filter(Boolean)
    .sort()
    .reverse()[0];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: ' 1fr 240px', height: '100%' }}>
      <Box>
        <Box sx={{ px:3, py:3, height:70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor:'var(--Color-greyscale-000)'}}>
          <Typography variant="h4" >
            데이터 연결 현황
          </Typography>
          <Box>
            <Typography variant="body1" >
              연결 플랫폼 {exchanges.length}개
            </Typography>
          </Box>
        </Box>
        <Divider/>
        {(['L', 'F', 'W'] as PlatformCategory[]).map((category) => {
          const list = grouped[category];
          return (
            <Stack>
              <Box key={category} sx={{ height:48, px: 2, py: 1.5, display: 'flex', alignItems: 'center', bgcolor: 'var(--Color-greyscale-100)'}}>
                <Typography variant="subtitle2" color="text.secondary">
                  {categoryLabels[category]}
                </Typography>
              </Box>
              <Divider />
              {list.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  연결된 {categoryLabels[category]}가 없어요.
                </Typography>
              ) : (
                <>
                <Stack>
                  {list.map((item) => {
                    const status = statusMap[item.seq_user_exchange];
                    const badge = status ? statusBadges[status] : undefined;
                    const info =
                      item.type === 'API'
                        ? item.api_key
                        : item.type === 'WALLET'
                          ? item.address
                          : item.file_list?.[0]?.file_name;
                    return (
                      <Box
                        key={item.seq_user_exchange}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr auto',
                          alignItems: 'center',
                          gap: 1,
                          borderRadius: 1,
                          bgcolor: 'white',
                          p: 1.25,
                          height: 86
                        }}
                        
                      >
                        <Box>
                          <Typography fontWeight={600}>{item.nickname}</Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {info ?? '정보 없음'}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {formatUpdatedAt(item.updated_at) ?? '미수집'}
                        </Typography>
                        <Chip
                          size="small"
                          label={badge?.label ?? '연결완료'}
                          color={badge?.color ?? 'success'}
                          variant="outlined"
                        />
                        
                      </Box>
                    );
                  })}
                </Stack>
                <Divider />
                </>
              )}
            </Stack>
          );
        })}
      </Box>
      <Box sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.1)'}}>
        <Box sx={{ px:2, py:3, height:70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor:'var(--Color-greyscale-000)'}}>
          <Typography variant="body1" >
            총액
          </Typography>
          <Typography variant="subtitle1" >
            940,520원
          </Typography>
        </Box>
        <Divider/>
        {(['L', 'F', 'W'] as PlatformCategory[]).map((category) => {
          const list = grouped[category];
          return (
            <Stack>
              <Box key={category} sx={{ height:48, px:2, py:3, display: 'flex', alignItems: 'center',justifyContent:'space-between', bgcolor: 'var(--Color-greyscale-100)'}}>
                <Typography variant="body2" color="text.secondary">
                  {categoryLabels[category]}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  888,888 원
                </Typography>
              </Box>
              <Divider />
              {list.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              ) : (
                <>
                <Stack>
                  {list.map((item) => {
                    const status = statusMap[item.seq_user_exchange];
                    const badge = status ? statusBadges[status] : undefined;
                    const info =
                      item.type === 'API'
                        ? item.api_key
                        : item.type === 'WALLET'
                          ? item.address
                          : item.file_list?.[0]?.file_name;
                    return (
                      <Box
                        key={item.seq_user_exchange}
                        sx={{
                          height: 86,
                          px: 2, py: 1.5,
                          display: 'flex',
                          justifyContent:'flex-end'
                        }}
                      >
                        <Typography variant='subtitle1'>888,888 원</Typography>
                      </Box>
                    );
                  })}
                </Stack>
                <Divider />
                </>
              )}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};
