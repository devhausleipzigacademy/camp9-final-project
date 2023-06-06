import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PollCard>;

export const Default: Story = {
  args: {
    title: 'Question',
    open: true,
    voted: false,
  },
};

export const Closed: Story = {
  args: {
    title: 'Question',
    open: false,
    voted: false,
  },
};

export const Voted: Story = {
  args: {
    title: 'Question',
    open: true,
    voted: true,
  },
};
