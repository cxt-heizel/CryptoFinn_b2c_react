import type { Meta, StoryObj } from '@storybook/react';
import { AppDialog } from './AppDialog';
import { AppButton } from './AppButton';
import React from 'react';

const meta: Meta<typeof AppDialog> = {
  title: 'Shared/AppDialog',
  component: AppDialog,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppDialog>;

/**
 * Dialog는 스토리에서 직접 open 상태를 제어해야 UI가 보임.
 * CSF3의 render 함수를 사용하여 상태를 주입하는 패턴이 가장 안정적임.
 */

/* 기본 Dialog */
export const Basic: Story = {
  args: {
    title: 'Dialog Title',
    children: '이것은 기본 다이얼로그 내용입니다.',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <AppButton variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </AppButton>

        <AppDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <>
              <AppButton onClick={() => setOpen(false)}>Cancel</AppButton>
              <AppButton variant="contained" onClick={() => setOpen(false)}>
                Confirm
              </AppButton>
            </>
          }
        />
      </>
    );
  },
};

/* 타이틀 없는 버전 */
export const WithoutTitle: Story = {
  args: {
    children: '타이틀 없이 내용만 있는 다이얼로그입니다.',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <AppButton variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </AppButton>

        <AppDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};

/* Custom Actions */
export const CustomActions: Story = {
  args: {
    title: 'Custom Action Dialog',
    children: '아래 액션 버튼이 다양한 UI로 변경될 수 있습니다.',
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <AppButton variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </AppButton>

        <AppDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <>
              <AppButton color="error" onClick={() => setOpen(false)}>
                Delete
              </AppButton>
              <AppButton variant="contained" onClick={() => setOpen(false)}>
                Close
              </AppButton>
            </>
          }
        />
      </>
    );
  },
};
