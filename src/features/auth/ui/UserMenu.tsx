import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '../model/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';

export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const initials = useMemo(() => {
    if (!user) return '?';
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }, [user]);

  const handleLogout = () => {
    dispatch(clearSession());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Box>
      <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)} startIcon={<Avatar>{initials}</Avatar>}>
        {user.name}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Typography variant="body2">{user.email}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
