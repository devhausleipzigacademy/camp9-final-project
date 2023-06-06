import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PollCard>;

export const New: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    open: true,
    voted: false,
  },
};

export const Pending: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    open: true,
    voted: true,
  },
};

export const Closed: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    open: false,
    voted: true,
  },
};
