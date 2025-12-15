import { SxProps, Typography, Box } from '@mui/material';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { flexAlign,textAlign, type Align } from '../../../shared/tokens/align';



interface Props {
  title: React.ReactNode;
  gap?: number;
  align?: Align;
  children?: ReactNode;
  slotProps?: {
    root?: SxProps;
    title?: SxProps;
    content?: SxProps;
  };
}

interface StyledProps {
  align: Align;
  gap: number;
}


const CardContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'align' && prop !== 'gap',
})<StyledProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => flexAlign[align]};
  text-align: ${({ align }) => textAlign[align]};
  gap: ${({ gap }) => `${gap}px`};
  & .light{
    font-weight: 400;
    color : 'primary.main';
    font-size: 18px; 
  }
  & .bold{
    font-weight: 600;
  }
`;

export const LandingCardContent = ({
  title,
  children,
  gap = 10,
  align = 'left',
  slotProps = {},
}: Props) => {
  return (
    <CardContent align={align} gap={gap} sx={slotProps.root}>
      <Typography variant="subtitle1" sx={{fontWeight:700}}>{title}</Typography>
      {children}
    </CardContent>
  );
};
