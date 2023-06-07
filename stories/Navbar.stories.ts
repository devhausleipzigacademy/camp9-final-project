import { Navbar } from '../components/Navbar';
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
    primary: true,
    able: true,
  },
};

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Secondary: Story = {};
