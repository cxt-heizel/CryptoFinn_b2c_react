import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AppTextField } from './AppTextField';

const meta: Meta<typeof AppTextField> = {
  title: 'Shared/AppTextField',
  component: AppTextField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppTextField>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    multiline: true,
    minRows: 3,
    placeholder: 'Share more context...',
  },
};

export const ControlledInput: Story = {
  args: {
    label: 'Controlled field',
    placeholder: 'Type to see the current value',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ maxWidth: 420 }}>
        <AppTextField
          {...args}
          value={value}
          helperText={`Current value: ${value || 'none'}`}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};
