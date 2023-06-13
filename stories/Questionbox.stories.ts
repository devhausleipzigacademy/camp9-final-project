import type { Meta, StoryObj } from '@storybook/react';
import { Questionbox } from '../components/Question';

const meta: Meta<typeof Questionbox> = {
  title: 'components/Questionbox',
  component: Questionbox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Questionbox>;

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
