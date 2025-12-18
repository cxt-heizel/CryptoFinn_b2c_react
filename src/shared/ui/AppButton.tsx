import { Button, ButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface Props extends ButtonProps {
  title?: string;
  actions?: ButtonProps;
  isRounded?: boolean;
  outlinedColor?: string;
}

export const AppButton = ({ isRounded, outlinedColor, sx, variant, color, ...props }: Props) => {
  const baseSx = sx ? (Array.isArray(sx) ? sx : [sx]) : [];
  const roundedSx = isRounded ? [{ borderRadius: 999 }] : [];
  const outlinedSx =
    variant === 'outlined'
      ? [
          {
            fontWeight: 500,
            ...(outlinedColor
              ? { borderColor: outlinedColor }
              : color === 'primary' || color === undefined
                ? { borderColor: '#E6E6EA' }
                : {}),
          },
        ]
      : [];
  const sxObj: SxProps<Theme> = [...baseSx, ...roundedSx, ...outlinedSx];

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      sx={sxObj}
    />
  );
};
