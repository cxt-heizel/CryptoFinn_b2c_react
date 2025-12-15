import type { Meta, StoryObj } from '@storybook/react';
import { AppButton } from './AppButton';
import { ButtonProps } from '@mui/material';

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
  },
};

export default meta;

type Story = StoryObj<typeof AppButton>;

// 기본 스토리
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'contained',
    color: 'primary',
  },
};
