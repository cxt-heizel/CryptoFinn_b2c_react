import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
