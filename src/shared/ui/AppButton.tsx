import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props extends ButtonProps {
  title?: string;
  actions?: ButtonProps;
}

export const AppButton = (Props: Props) => {
  return <Button {...Props} />;
};

