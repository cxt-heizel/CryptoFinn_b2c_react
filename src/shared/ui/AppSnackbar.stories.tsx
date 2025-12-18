import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AppSnackbar } from './AppSnackbar';
import { AppButton } from './AppButton';
import { SnackbarSeverity } from '../hooks/useSnackbar';

const meta: Meta<typeof AppSnackbar> = {
  title: 'Shared/AppSnackbar',
  component: AppSnackbar,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'radio' },
      options: ['success', 'info', 'warning', 'error'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppSnackbar>;

export const Playground: Story = {
  args: {
    message: 'Saved successfully',
    severity: 'success',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleClose = (_: unknown, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    return (
      <>
        <AppButton variant="contained" onClick={() => setOpen(true)}>
          Show Snackbar
        </AppButton>

        <AppSnackbar
          {...args}
          open={open}
          onClose={handleClose}
        />
      </>
    );
  },
};

export const DifferentSeverities: Story = {
  args: {
    message: 'Be aware of the current state.',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<SnackbarSeverity>('info');

    const handleClose = (_: unknown, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    };

    const showWith = (next: SnackbarSeverity) => {
      setSeverity(next);
      setOpen(true);
    };

    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          <AppButton onClick={() => showWith('success')}>Success</AppButton>
          <AppButton onClick={() => showWith('info')}>Info</AppButton>
          <AppButton onClick={() => showWith('warning')}>Warning</AppButton>
          <AppButton color="error" onClick={() => showWith('error')}>
            Error
          </AppButton>
        </div>

        <AppSnackbar
          {...args}
          severity={severity}
          open={open}
          onClose={handleClose}
        />
      </>
    );
  },
};
