import type { Meta, StoryObj } from '@storybook/react';
import Radiobutton from '../components/Radiobutton';
const meta: Meta<typeof Radiobutton> = {
  title: 'components/Radiobutton',
  component: Radiobutton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Radiobutton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};
