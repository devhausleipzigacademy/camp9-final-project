import type { Meta, StoryObj } from '@storybook/react';
import UserEdit from 'components/UserEdit';

const meta: Meta<typeof UserEdit> = {
  title: 'UserEdit',
  component: UserEdit,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UserEdit>;

export const Pencil: Story = {
  args: {
    variant: 'pencil',
  },
};

export const Check: Story = {
  args: {
    variant: 'check',
  },
};
