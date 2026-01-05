import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AppDialog } from '../../../shared/ui/AppDialog';
import { ExchangeMeta, categoryLabels } from '../model/types';

type Props = {
  open: boolean;
  exchanges: ExchangeMeta[];
  connectedSeqs?: Array<string | number>;
  onClose: () => void;
  onSelect: (items: ExchangeMeta[]) => void;
};

export const PlatformSelectDialog = ({ open, exchanges, connectedSeqs = [], onClose, onSelect }: Props) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ExchangeMeta[]>([]);

  const normalizedConnected = connectedSeqs.map(String);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const available = exchanges.filter(
      (item) => !normalizedConnected.includes(String(item.seq)) || item.category === 'W',
    );
    if (!keyword) return available;
    return available.filter(
      (item) =>
        item.en_name.toLowerCase().includes(keyword) ||
        (item.ko_name ?? '').toLowerCase().includes(keyword),
    );
  }, [exchanges, normalizedConnected, search]);

  const toggle = (item: ExchangeMeta) => {
    setSelected((prev) => {
      const exists = prev.some((p) => String(p.seq) === String(item.seq));
      if (exists) return prev.filter((p) => String(p.seq) !== String(item.seq));
      return [...prev, item];
    });
  };

  const handleConfirm = () => {
    onSelect(selected);
    onClose();
  };

  const handleReset = () => setSelected([]);

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="연결할 플랫폼을 선택하세요"
      maxWidth="md"
      fullWidth
      actions={
        <>
          <Chip label={`${selected.length}개 선택`} sx={{ mr: 'auto' }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" onClick={handleReset}>
              초기화
            </Button>
            <Button variant="contained" onClick={handleConfirm} disabled={selected.length === 0}>
              선택 완료
            </Button>
          </Stack>
        </>
      }
    >
      <Stack spacing={2}>
        <TextField
          placeholder="이름으로 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <List dense sx={{ maxHeight: 420, overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: 2 }}>
          {filtered.map((item) => {
            const checked = selected.some((s) => String(s.seq) === String(item.seq));
            return (
              <ListItem
                key={item.seq}
                secondaryAction={<Checkbox edge="end" checked={checked} onChange={() => toggle(item)} />}
                sx={{ borderBottom: '1px solid #f1f5f9' }}
              >
                <ListItemAvatar>
                  <Box
                    component="img"
                    src={item.logo}
                    alt={item.en_name}
                    sx={{ width: 36, height: 36, borderRadius: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={600}>{item.en_name}</Typography>
                      <Chip size="small" label={categoryLabels[item.category]} />
                    </Stack>
                  }
                  secondary={item.ko_name}
                />
              </ListItem>
            );
          })}
          {filtered.length === 0 && (
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                선택 가능한 플랫폼이 없습니다.
              </Typography>
            </Box>
          )}
        </List>
      </Stack>
    </AppDialog>
  );
};
