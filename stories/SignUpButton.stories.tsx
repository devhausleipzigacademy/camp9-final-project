import { Meta, StoryObj } from '@storybook/react';
import SignUpButton from '../components/SignUpButton';

const meta: Meta<typeof SignUpButton> = {
  title: 'SignUpButton',
  component: SignUpButton,
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
type Story = StoryObj<typeof SignUpButton>;

export const Default: Story = {
  args: {
    children: 'Sign Up',
    enable: true,
    backgroundColor: 'bg-teal',
    href: '/',
    padding: 'p-4',
  },
};
