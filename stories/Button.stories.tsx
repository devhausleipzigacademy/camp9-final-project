import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    enable: true,
    className:
      'border-3  border-black rounded w-full flex flex-col p-4 justify-between  shadow-brutalist gap-2',
    bgColor: 'bg-teal',
    href: '/',
  },
};
