import { Avatar, Box, Button, Chip, Divider, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { categoryLabels, PlatformCategory, PlatformStatus, statusBadges } from '../model/types';
import { SectionHeader } from './atoms/SectionHeader';
import { StackHeader } from './atoms/StackHeader';
import { ItemBlock } from '../../../shared/ui/ItemBlock';
import { StatusChip } from './atoms/StatusChip';

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
    <Stack sx={{ height: '100%', overflow: 'visible'}}>
      <SectionHeader>
        연결 플랫폼
      </SectionHeader>
      <Box sx={{flex:1, bgcolor:'white'}}>
        <Stack spacing="1px" sx={{bgcolor:'var(--Color-greyscale-300)', pb:'1px'}}>
          {sections.map((section) => (
            <Stack key={section.category} sx={{gap: '1px'}}>
              <StackHeader>{categoryLabels[section.category]}</StackHeader>
              {section.items.length > 0 &&
                section.items.map((item) => {
                  const isSelected = selectedKey === item.key;
                  const isConnected = item.connected;
                  return (
                    <Box
                      key={item.key}
                      onClick={() => onSelect?.(item)}
                      selected={isSelected}
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'var(--Color-greyscale-050)'
                        },
                        bgcolor:'white',
                        alignItems: 'center',
                        gap: 1.25,
                        borderRadius:0,
                        height: 86,
                        border:'none'
                      }}
                    >
                      <ItemBlock 
                      title={item.name} 
                      desc={isConnected? item.subtitle : null } 
                      avatarUrl={item.logo} 
                      slotProps={{ root:{
                        height: "100%",
                        py: 1, px:2
                      }}}
                      action={ <StatusChip isConnected={isConnected} status={item.status} /> }
                      />
                    </Box>
                  );
                })}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
