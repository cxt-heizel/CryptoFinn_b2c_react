import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

interface Props extends DialogProps {
  title?: string;
  actions?: ReactNode;
}

export const AppDialog = ({ title, actions, children, ...rest }: Props) => {
  return (
    <Dialog fullWidth maxWidth="sm" {...rest}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
};
