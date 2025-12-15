import { Box, Container, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
}

export const AuthLayout = ({ children, title = 'Welcome back' }: Props) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: '#f5f7fb' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {children}
        </Paper>
      </Container>
    </Box>
  );
};
