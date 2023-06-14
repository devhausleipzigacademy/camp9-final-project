import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../components/Checkbox';

const meta: Meta<typeof Box> = {
  title: 'components/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//   },
// };
// export const Tertiary: Story = {
//   args: {
//     variant: 'tertiary',
//   },
// };
