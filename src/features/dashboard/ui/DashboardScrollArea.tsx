import { ReactNode } from 'react';
import styled from '@emotion/styled';
import * as ScrollArea from '@radix-ui/react-scroll-area';

type Props = {
  children: ReactNode;
};

const ScrollAreaRoot = styled(ScrollArea.Root)`
  width: 100%;
  height: calc(100vh - 108px);
  background: #fafafb;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  overflow: hidden;
`;

const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

const Scrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 14px 6px;
  background: transparent;

  &[data-orientation='vertical'] {
    width: 16px;
  }

  &[data-orientation='horizontal'] {
    height: 10px;
  }
`;

const ScrollThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background: var(--Color-greyscale-700);
  border-radius: 10px;
  position: relative;
  opacity: 0.5;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    min-width: 44px;
    min-height: 44px;
  }
`;

const ScrollCorner = styled(ScrollArea.Corner)``;

export const DashboardScrollArea = ({ children }: Props) => {
  return (
    <ScrollAreaRoot type="always">
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      <Scrollbar orientation="vertical">
        <ScrollThumb />
      </Scrollbar>
      <ScrollCorner />
    </ScrollAreaRoot>
  );
};
