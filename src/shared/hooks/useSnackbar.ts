import { useCallback, useState } from 'react';

export type SnackbarSeverity = 'success' | 'info' | 'warning' | 'error';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('info');

  const showMessage = useCallback((text: string, type: SnackbarSeverity = 'info') => {
    setMessage(text);
    setSeverity(type);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return {
    open,
    message,
    severity,
    showMessage,
    handleClose,
  };
};
