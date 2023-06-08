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

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};

export const Login: Story = {
  args: {
    children: 'Login ↗',
  },
};

export const SignUp: Story = {
  args: {
    children: 'Sign up',
    variant: 'secondary',
  },
};

export const Next: Story = {
  args: {
    children: 'Next >',
    size: 'medium',
    variant: 'primary',
  },
};

export const Back: Story = {
  args: {
    children: '< Back',
    size: 'small',
    variant: 'secondary',
  },
};

export const DateTime: Story = {
  args: {
    children: 'Date & Time',
    size: 'medium',
    variant: 'primary',
  },
};

export const Countdown: Story = {
  args: {
    children: 'Countdown',
    size: 'small',
    variant: 'secondary',
  },
};
