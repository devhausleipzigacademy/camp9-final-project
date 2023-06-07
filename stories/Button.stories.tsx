import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Enabled: Story = {
  args: {
    children: 'Button',
    enable: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    enable: false,
  },
};
