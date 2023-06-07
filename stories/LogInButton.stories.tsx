
import { Meta, StoryObj } from '@storybook/react';
import LogInButton from '../components/LoginButton';

const meta: Meta<typeof LogInButton> = {
  title: 'LogInButton',
  component: LogInButton,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: {
        type: 'select',
        options: ['p-1', 'p-4'],
        defaultValue: 'p-4',
      },
    },
    bgColor: {
      control: {
        type: 'color',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogInButton>;

export const Default: Story = {
  args: {
    children: 'Log In',
    enable: true,
    bgColor: 'bg-yellow',
    href: '/',
    padding: 'p-4',
  },
};
