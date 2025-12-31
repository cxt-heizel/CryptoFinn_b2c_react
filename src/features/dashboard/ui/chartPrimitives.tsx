import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { useElementWidth } from '../../../shared/hooks/useElementWidth';
import { ResponsiveContainer } from 'recharts';

export const AXIS_TICK_STYLE = { fill: 'var(--Color-greyscale-800)', fontSize: 14 } as const;
export const LINE_CHART_MARGIN = { top: 12, right: 12, left: 0, bottom: 12 } as const;
export const BAR_CHART_MARGIN = { top: 20, right: 16, left: 8, bottom: 12 } as const;
export const DEFAULT_BAR_SIZE = 120;
export const FAVORITE_CHART_WIDTH = 319;

export const ChartCard = ({ id, children, sx }: { id?: string; children: ReactNode; sx?: SxProps<Theme> }) => (
  <Box sx={{ p: 2, flex: 1, ...sx }} id={id}>
    {children}
  </Box>
);

export const ChartContainer = ({
  height,
  children,
  sx,
}: {
  height: number;
  children: ReactNode;
  sx?: SxProps<Theme>;
}) => {
  const { ref, width } = useElementWidth<HTMLDivElement>({ debounceMs: 120 });
  const isReady = width > 0 && height > 0;

  return (
    <Box ref={ref} sx={{ height, width: '100%', minWidth: 0, ...sx }}>
      {isReady && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width, height }}
          minWidth={1}
        >
          {children}
        </ResponsiveContainer>
      )}
    </Box>
  );
};
