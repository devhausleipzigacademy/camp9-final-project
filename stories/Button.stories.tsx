import { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    enable: true,
    bgColor: 'bg-teal',
    href: '/',
    padding: 'p-4',
  },
};
