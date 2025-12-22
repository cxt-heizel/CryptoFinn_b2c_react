import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { TextBlock, TextBlockSize } from './TextBlock';
import { Align } from '../tokens/align';

const meta: Meta<typeof TextBlock> = {
  title: 'Shared/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'lg'],
    },
    titleFirst: {
      control: { type: 'boolean' },
    },
    nowrap: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextBlock>;

export const Playground: Story = {
  args: {
    title: 'ExTitle',
    desc: 'description example',
    align: 'left',
    titleFirst: true,
    size: 'default',
    nowrap: true,
  },
};

export const VariantMatrix: Story = {
  render: () => {
    const alignments: Align[] = ['left', 'center', 'right'];
    const orders = [true, false];
    const sizes: TextBlockSize[] = ['default', 'lg'];

    const combinations = sizes.flatMap((size) =>
      orders.flatMap((titleFirst) =>
        alignments.map((align) => ({ size, titleFirst, align })),
      ),
    );

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 3,
          maxWidth: 520,
        }}
      >
        {combinations.map(({ size, titleFirst, align }) => (
          <TextBlock
            key={`${size}-${titleFirst}-${align}`}
            title="ExTitle"
            desc="description example"
            size={size}
            titleFirst={titleFirst}
            align={align}
          />
        ))}
      </Box>
    );
  },
};
