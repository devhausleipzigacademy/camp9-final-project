import Navbar from '../components/Navbar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navbar> = {
  title: 'Example/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
