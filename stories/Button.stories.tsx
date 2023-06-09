import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/buttons/Button';
import { HiArrowDownRight, HiArrowUpRight } from 'react-icons/hi2';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: 'exclude',
      },
    },
  },
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
    inactive: true,
  },
};

export const Login: Story = {
  args: {
    children: 'Login ',
    icon: <HiArrowUpRight strokeWidth={1} />,
  },
};

export const LoginDisabled: Story = {
  args: {
    children: 'Login ',
    icon: <HiArrowUpRight strokeWidth={1} />,
    inactive: true,
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
    inactive: true,
  },
};

export const Logout: Story = {
  args: {
    children: 'Logout',
    icon: <HiArrowDownRight strokeWidth={1} />,
    variant: 'logout',
  },
};

export const LogoutDisabled: Story = {
  args: {
    children: 'Logout',
    icon: <HiArrowDownRight strokeWidth={1} />,
    variant: 'logout',
    inactive: true,
  },
};

export const Next: Story = {
  args: {
    children: 'Next',
    icon: <GrFormNext strokeWidth={1} />,
    variant: 'next',
  },
};

export const NextDisabled: Story = {
  args: {
    children: 'Next',
    icon: <GrFormNext strokeWidth={2} />,
    variant: 'next',
    inactive: true,
  },
};

export const Back: Story = {
  args: {
    children: 'Back',
    icon: <GrFormPrevious strokeWidth={2} />,
    variant: 'back',
  },
};

export const BackDisabled: Story = {
  args: {
    children: 'Back',
    icon: <GrFormPrevious strokeWidth={2} />,
    variant: 'back',
    inactive: true,
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
