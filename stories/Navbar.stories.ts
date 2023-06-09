import { Navbar } from '../components/shared/navbar/Navbar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navbar> = {
  title: 'Example/Navbar',
  component: Navbar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    variant: 'primary',
  },
};

export const Primary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Secondary: Story = {};
