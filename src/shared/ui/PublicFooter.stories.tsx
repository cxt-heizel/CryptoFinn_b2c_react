import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import PublicFooter from './PublicFooter';

const meta: Meta<typeof PublicFooter> = {
  title: 'Shared/PublicFooter',
  component: PublicFooter,
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

type Story = StoryObj<typeof PublicFooter>;

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div style={{ borderTop: '1px solid #e0e0e0', background: '#f7f8fa', paddingTop: 16 }}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    isSimple: false,
  },
  render: (args) => (
    <Wrapper>
      <PublicFooter {...args} />
    </Wrapper>
  ),
};

export const Simple: Story = {
  args: {
    isSimple: true,
  },
  render: (args) => (
    <Wrapper>
      <PublicFooter {...args} />
    </Wrapper>
  ),
};
