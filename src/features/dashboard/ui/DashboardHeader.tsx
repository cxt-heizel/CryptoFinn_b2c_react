import { Button, Stack, Typography } from '@mui/material';
import { UserMenu } from '../../auth/ui/UserMenu';

interface Props {
  onRefresh?: () => void;
}

export const DashboardHeader = ({ onRefresh }: Props) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
      <div>
        <Typography variant="h4">Overview</Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor the latest product, user, and revenue metrics.
        </Typography>
      </div>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button variant="outlined" onClick={onRefresh}>
          Refresh
        </Button>
        <UserMenu />
      </Stack>
    </Stack>
  );
};
