import { Typography } from '@mui/material';
import { LoginForm } from '../../features/auth/ui/LoginForm';

export const LoginPage = () => {
  return (
    <div>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Demo credentials are accepted; submit any email/password combination to continue.
      </Typography>
      <LoginForm />
    </div>
  );
};
