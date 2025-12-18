import type { Meta, StoryObj } from '@storybook/react';
import { AppButton } from './AppButton';
import { PublicThemeProvider } from '../../app/providers/PublicThemeProvider';

// 기본 메타 설정
const meta: Meta<typeof AppButton> = {
  title: 'Shared/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    isRounded: {
      control: { type: 'boolean' },
    },
    outlinedColor: {
      control: { type: 'color' },
    },
  },
  decorators: [
    (Story) => (
      <PublicThemeProvider>
        <Story />
      </PublicThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AppButton>;

// 기본 스토리
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'contained',
    color: 'secondary',
    size: 'medium',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded Button',
    variant: 'contained',
    color: 'primary',
    size: 'large',
    isRounded: true,
  },
};

export const CustomOutlinedBorder: Story = {
  args: {
    children: 'Custom Outlined',
    variant: 'outlined',
    color: 'secondary',
    size: 'medium',
    outlinedColor: '#0b1626',
  },
};
