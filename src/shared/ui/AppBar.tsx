import { AppBar as MuiAppBar, Box, Toolbar, Typography, AppBarProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props extends AppBarProps {
  title?: string;
  children?: ReactNode;
}

export const AppBar = ({ title, children, ...appBarProps }: Props) => {
  return (
    <MuiAppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ height: '92px', bgcolor: '#fff', color: 'text.primary'}}
      {...appBarProps}
    >
      <Toolbar sx={{ height: '100%', padding: '28px 40px 24px 32px', display: 'flex', alignItems: 'center', gap: 2}}>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {children}
          </Box>
        ) : null}
      </Toolbar>
    </MuiAppBar>
  );
};
