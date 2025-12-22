import { ReactNode } from 'react';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { Align, flexAlign, textAlign } from '../tokens/align';

export type TextBlockSize = 'default' | 'lg';

type SlotProps = {
  root?: BoxProps;
  title?: TypographyProps;
  desc?: TypographyProps;
};

export type TextBlockProps = {
  title?: ReactNode;
  desc?: ReactNode;
  align?: Align;
  titleFirst?: boolean;
  size?: TextBlockSize;
  nowrap?: boolean;
  slotProps?: SlotProps;
};

const sizeTokens: Record<
  TextBlockSize,
  {
    gap: number;
    titleVariant: TypographyProps['variant'];
    descVariant: TypographyProps['variant'];
    titleSx: TypographyProps['sx'];
    descSx: TypographyProps['sx'];
  }
> = {
  default: {
    gap: 0.5, // 4px
    titleVariant: 'h4',
    descVariant: 'body2',
    titleSx: { fontSize: 16, fontWeight: 600 },
    descSx: { fontSize: 12, fontWeight: 400 },
  },
  lg: {
    gap: 1, // 8px
    titleVariant: 'h2',
    descVariant: 'body1',
    titleSx: { fontSize: 22, fontWeight: 600 },
    descSx: { fontSize: 14, fontWeight: 400 },
  },
};

export const TextBlock = ({
  title = 'ExTitle',
  desc = 'description example',
  align = 'left',
  titleFirst = true,
  size = 'default',
  nowrap = true,
  slotProps,
}: TextBlockProps) => {
  const { gap, titleVariant, descVariant, titleSx, descSx } = sizeTokens[size];
  const rootProps = slotProps?.root ?? {};
  const titleProps = slotProps?.title ?? {};
  const descProps = slotProps?.desc ?? {};

  const commonTypographySx = {
    whiteSpace: nowrap ? 'nowrap' : 'normal',
    lineHeight: 1,
    letterSpacing: '-0.015em',
  };

  const titleElement = (
    <Typography
      {...titleProps}
      variant={titleProps.variant ?? titleVariant}
      sx={[
        {
          color: 'var(--Color-greyscale-1000)',
          ...commonTypographySx,
        },
        titleSx,
        titleProps.sx,
      ]}
      data-name="title"
    >
      {title}
    </Typography>
  );

  const descElement = (
    <Typography
      {...descProps}
      variant={descProps.variant ?? descVariant}
      sx={[
        {
          color: 'var(--Color-greyscale-700)',
          ...commonTypographySx,
        },
        descSx,
        descProps.sx,
      ]}
      data-name="description"
    >
      {desc}
    </Typography>
  );

  return (
    <Box
      {...rootProps}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: flexAlign[align],
          justifyContent: 'center',
          textAlign: textAlign[align],
          gap,
        },
        rootProps.sx,
      ]}
      data-name={`align=${align}, titleFirst=${titleFirst}, size=${size}`}
      data-node-id="4550:7343"
    >
      {titleFirst ? (
        <>
          {titleElement}
          {descElement}
        </>
      ) : (
        <>
          {descElement}
          {titleElement}
        </>
      )}
    </Box>
  );
};
