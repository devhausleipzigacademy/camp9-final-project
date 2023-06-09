import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/buttons/Button';
import { HiArrowUpRight } from 'react-icons/hi2';

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
    children: (
      <>
        <h3>Login </h3>
        <HiArrowUpRight strokeWidth={1} />
      </>
    ),
  },
};

export const LoginDisabled: Story = {
  args: {
    children: 'Login ↗',
    disabled: true,
  },
};

export const SignUp: Story = {
  args: {
    children: 'Sign up',
    variant: 'signup',
  },
};

export const SignUpDisabled: Story = {
  args: {
    children: 'Sign up',
    variant: 'signup',
    disabled: true,
  },
};

export const Logout: Story = {
  args: {
    children: 'Logout ↘',

    variant: 'logout',
  },
};

export const LogoutDisabled: Story = {
  args: {
    children: 'Logout ↘',
    variant: 'logout',
    disabled: true,
  },
};

export const Next: Story = {
  args: {
    children: 'Next >',
    variant: 'next',
  },
};

export const NextDisabled: Story = {
  args: {
    children: 'Next >',
    variant: 'next',
    disabled: true,
  },
};

export const Back: Story = {
  args: {
    children: '< Back',
    variant: 'back',
  },
};

export const BackDisabled: Story = {
  args: {
    children: '< Back',
    disabled: true,
  },
};

export const DateTime: Story = {
  args: {
    children: 'Date & Time',
    variant: 'date&time',
  },
};

export const Countdown: Story = {
  args: {
    children: 'Countdown',
    variant: 'countdown',
  },
};
