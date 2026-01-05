import { AppBar as MuiAppBar, Box, Toolbar, Typography, AppBarProps } from '@mui/material';
import { ReactNode } from 'react';

interface Props extends AppBarProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}

export const AppBar = ({ title, subtitle, actions, children, ...appBarProps }: Props) => {
  const renderedActions = actions ?? children;

  return (
    <MuiAppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ height: '92px', bgcolor: '#fff', color: 'text.primary' }}
      {...appBarProps}
    >
      <Toolbar sx={{ height: '100%', padding: '28px 40px 24px 32px', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
          {title ? (
            <Typography
              variant="h1"
              component="div"
              sx={{ lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {title}
            </Typography>
          ) : null}
          {subtitle
            ? typeof subtitle === 'string' || typeof subtitle === 'number'
              ? (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                )
              : subtitle
            : null}
        </Box>
        {renderedActions ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {renderedActions}
          </Box>
        ) : null}
      </Toolbar>
    </MuiAppBar>
  );
};
