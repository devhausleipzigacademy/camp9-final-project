import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
  tags: ['autodocs'],
  argTypes: {
    dateInput: {
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PollCard>;

export const New: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-15T00:00:00'),
    voted: false,
    voteButton: true,
  },
};

export const Pending: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-15T00:00:00'),
    voted: true,
    voteButton: true,
  },
};

export const Closed: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-01T00:00:00'),
    voteButton: true,
    voted: true,
  },
};

export const MineOpen: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    voteButton: false,
    dateInput: new Date('2023-06-15T00:00:00'),
  },
};

export const MineClosed: Story = {
  args: {
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    voteButton: false,
    dateInput: new Date('2023-06-01T00:00:00'),
  },
};
