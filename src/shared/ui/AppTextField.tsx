import { TextField, TextFieldProps } from '@mui/material';

export const AppTextField = (props: TextFieldProps) => {
  return <TextField fullWidth margin="normal" {...props} />;
};
