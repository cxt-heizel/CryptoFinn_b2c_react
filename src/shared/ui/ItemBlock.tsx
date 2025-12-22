import { ReactNode } from 'react';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { TextBlock, TextBlockProps } from './TextBlock';

type SlotProps = {
  root?: BoxProps;
  left?: BoxProps;
  avatar?: BoxProps;
  textBlock?: TextBlockProps['slotProps'];
  action?: BoxProps;
  actionLabel?: TypographyProps;
};

export type ItemBlockProps = {
  title?: ReactNode;
  desc?: ReactNode;
  avatar?: ReactNode;
  avatarUrl?: string;
  action?: ReactNode;
  children?: ReactNode;
  slotProps?: SlotProps;
};

export const ItemBlock = ({
  title = 'ExTitle',
  desc = 'description example',
  avatar,
  avatarUrl,
  action,
  children,
  slotProps,
}: ItemBlockProps) => {
  const rootProps = slotProps?.root ?? {};
  const leftProps = slotProps?.left ?? {};
  const avatarProps = slotProps?.avatar ?? {};
  const textBlockSlotProps = slotProps?.textBlock ?? {};
  const actionProps = slotProps?.action ?? {};
  const actionLabelProps = slotProps?.actionLabel ?? {};

  const actionContent =
    children ??
    action ??
    (
      <Typography
        {...actionLabelProps}
        variant={actionLabelProps.variant ?? 'caption'}
        sx={[
          {
            color: '#9747FF',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.66,
            letterSpacing: 0.4,
            fontFamily: `'Roboto', 'Pretendard', sans-serif`,
          },
          actionLabelProps.sx,
        ]}
      >
        Instance Slot
      </Typography>
    );

  return (
    <Box
      {...rootProps}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 1.5, // 12px
          width: '100%',
          minHeight: 40,
        },
        rootProps.sx,
      ]}
      data-name="ItemBlock"
      data-node-id="4550:7430"
    >
      <Box
        {...leftProps}
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            gap: 1.5, // 12px
            minWidth: 0,
            flexShrink: 0,
          },
          leftProps.sx,
        ]}
        data-name="AvatarTextBlock"
        data-node-id="6001:3542"
      >
        <Box
          {...avatarProps}
          sx={[
            {
              width: 40,
              height: 40,
              bgcolor: 'var(--Color-greyscale-400)',
              borderRadius: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            },
            avatarProps.sx,
          ]}
          data-name="Avatar"
          data-node-id="I6001:3542;4550:33259"
        >
          {avatar ??
            (avatarUrl ? (
              <Box
                component="img"
                src={avatarUrl}
                alt={typeof title === 'string' ? title : 'avatar'}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : null)}
        </Box>

        <TextBlock
          title={title}
          desc={desc}
          align="left"
          size="default"
          nowrap
          slotProps={{
            ...textBlockSlotProps,
            title: {
              ...textBlockSlotProps.title,
              sx: [
                { color: 'var(--Color-greyscale-1100)' },
                textBlockSlotProps.title?.sx,
              ],
            },
            desc: {
              ...textBlockSlotProps.desc,
              sx: [
                { color: 'var(--Color-greyscale-700)' },
                textBlockSlotProps.desc?.sx,
              ],
            },
          }}
        />
      </Box>

      <Box
        {...actionProps}
        sx={[
          {
            flex: 1,
            minHeight: 40,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 1.5,
            minWidth: 0,
          },
          actionProps.sx,
        ]}
        data-name="ActionSlot"
        data-node-id="6001:3704"
      >
        {actionContent}
      </Box>
    </Box>
  );
};
