import { Alert, Snackbar, SnackbarProps } from '@mui/material';
import { SnackbarSeverity } from '../hooks/useSnackbar';

interface Props extends SnackbarProps {
  message: string;
  severity?: SnackbarSeverity;
}

export const AppSnackbar = ({ message, severity = 'info', onClose, ...rest }: Props) => {
  return (
    <Snackbar autoHideDuration={4000} onClose={onClose} {...rest}>
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
