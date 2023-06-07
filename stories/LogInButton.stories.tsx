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
    backgroundColor: {
      control: {
        type: 'color',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogInButton>;

export const Enabled: Story = {
  args: {
    children: 'Log In',
    enable: true,
  },
  
};

export const Disabled: Story = {
  args: {
    children: 'Log In',
    enable: false,
  },
};
