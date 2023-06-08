import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/buttons/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Login: Story = {
  args: {
    children: 'Login ↗',
  },
};
