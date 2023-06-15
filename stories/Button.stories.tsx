import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/shared/buttons/Button';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { type: 'string' },
    onClick: { table: { disable: true } },
    handleClick: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'primary',
    size: 'full',
  },
};

export const DefaultDisabled: Story = {
  args: {
    children: 'Default',
    size: 'full',
    disabled: true,
  },
};

export const Login: Story = {
  args: {
    children: (
      <>
        <h3>Login</h3>
        <HiOutlineArrowNarrowRight size={25} strokeWidth={2} />
      </>
    ),
    variant: 'primary',
    size: 'full',
  },
};

export const LoginDisabled: Story = {
  args: {
    children: (
      <>
        <h3>Login</h3>
        <HiOutlineArrowNarrowRight size={25} strokeWidth={2} />
      </>
    ),
    size: 'full',
    disabled: true,
  },
};

export const SignUp: Story = {
  args: {
    children: 'Sign up',
    variant: 'secondary',
    size: 'full',
  },
};

export const SignUpDisabled: Story = {
  args: {
    children: 'Sign up',
    size: 'full',
  },
};

export const Logout: Story = {
  args: {
    children: (
      <>
        <HiOutlineArrowNarrowLeft size={25} strokeWidth={2} />
        <h3>Logout</h3>
      </>
    ),
    variant: 'secondary',
    size: 'full',
  },
};

export const LogoutDisabled: Story = {
  args: {
    children: (
      <>
        <HiOutlineArrowNarrowLeft size={25} strokeWidth={2} />
        <h3>Logout</h3>
      </>
    ),
    size: 'full',
    disabled: true,
  },
};

export const Next: Story = {
  args: {
    children: (
      <>
        <h3>Next</h3>
        <GrFormNext size={24} strokeWidth={2} />
      </>
    ),
    variant: 'primary',
    size: 'large',
  },
};

export const NextDisabled: Story = {
  args: {
    children: (
      <>
        <h3>Next</h3>
        <GrFormNext size={24} strokeWidth={2} />
      </>
    ),
    size: 'large',
    disabled: true,
  },
};

export const Back: Story = {
  args: {
    children: (
      <>
        <GrFormPrevious size={24} strokeWidth={2} />
        <h3>Back</h3>
      </>
    ),
    variant: 'secondary',
    size: 'small',
  },
};

export const BackDisabled: Story = {
  args: {
    children: (
      <>
        <GrFormPrevious size={24} strokeWidth={2} />
        <h3>Back</h3>
      </>
    ),
    disabled: true,
    size: 'small',
  },
};

export const DateTime: Story = {
  args: {
    children: 'Date & Time',
    variant: 'primary',
    size: 'medium',
  },
};

export const DateTimeInactive: Story = {
  args: {
    children: 'Date & Time',
    variant: 'primary',
    size: 'medium',
    isActive: false,
  },
};

export const Countdown: Story = {
  args: {
    children: 'Countdown',
    variant: 'secondary',
    size: 'medium',
  },
};

export const CountdownInactive: Story = {
  args: {
    children: 'Countdown',
    variant: 'secondary',
    size: 'medium',
    isActive: false,
  },
};
