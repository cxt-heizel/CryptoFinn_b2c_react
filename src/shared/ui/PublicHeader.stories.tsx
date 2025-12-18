import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import PublicHeader from './PublicHeader';

const meta: Meta<typeof PublicHeader> = {
  title: 'Shared/PublicHeader',
  component: PublicHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isSimple: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PublicHeader>;

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ background: '#0f172a', minHeight: 120 }}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    isSimple: false,
  },
  render: (args) => (
    <Wrapper>
      <PublicHeader {...args} />
    </Wrapper>
  ),
};

export const Simple: Story = {
  args: {
    isSimple: true,
  },
  render: (args) => (
    <Wrapper>
      <PublicHeader {...args} />
    </Wrapper>
  ),
};
