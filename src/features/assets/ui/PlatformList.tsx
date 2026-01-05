import { Avatar, Box, Chip, Divider, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { categoryLabels, PlatformCategory, PlatformStatus, statusBadges } from '../model/types';

export type PlatformListItem = {
  key: string;
  name: string;
  subtitle?: string;
  logo?: string;
  connected: boolean;
  status?: PlatformStatus;
  category: PlatformCategory;
};

export type PlatformListSection = {
  category: PlatformCategory;
  items: PlatformListItem[];
};

interface Props {
  sections: PlatformListSection[];
  selectedKey?: string;
  onSelect?: (item: PlatformListItem) => void;
}

export const PlatformList = ({ sections, selectedKey, onSelect }: Props) => {
  return (
    <Stack sx={{ height: '100%', overflow: 'hidden', bgcolor:'var(--Color-greyscale-000)',borderRight:'1px solid var(--Color-greyscale-300)' }}>
      <Box sx={{px:3, py:3, height:70}}>
        <Typography variant="h4">
          연결플랫폼
        </Typography>
      </Box>
      {sections.map((section) => (
        <Box
          key={section.category}
          sx={{
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Divider />
          <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', bgcolor: 'var(--Color-greyscale-100)',height:48}}>
            <Typography variant="subtitle2" color="text.secondary">
              {categoryLabels[section.category]}
            </Typography>
            <Chip
              size="small"
              label={`${section.items.length}개`}
              sx={{ ml: 'auto', bgcolor: '#f5f7fb', color: '#111827' }}
            />
          </Box>
          <Divider />
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {section.items.length === 0 ? (
              <Box sx={{ px: 2, py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  아직 연결된 플랫폼이 없어요.
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {section.items.map((item) => {
                  const isSelected = selectedKey === item.key;
                  const isConnected = item.connected;
                  const badge = item.status ? statusBadges[item.status] : undefined;
                  return (
                    <ListItemButton
                      key={item.key}
                      onClick={() => onSelect?.(item)}
                      selected={isSelected}
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'var(--Color-greyscale-050)',
                        },
                        alignItems: 'center',
                        gap: 1.25,
                        py: 1.25,
                        borderRadius:0,
                        height: 86
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={item.logo}
                        sx={{ width: 36, height: 36, bgcolor: '#EEF2FF' }}
                      >
                        {item.name.slice(0, 1)}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" fontWeight={600}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {item.subtitle}
                          </Typography>
                        }
                      />
                      {isConnected ? (
                        <Chip
                          size="small"
                          label={badge?.label ?? '연결'}
                          color={badge?.color ?? 'default'}
                          variant="outlined"
                        />
                      ) : (
                        <Chip size="small" label="연결대기" variant="outlined" color="info" />
                      )}
                    </ListItemButton>
                  );
                })}
              </List>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
