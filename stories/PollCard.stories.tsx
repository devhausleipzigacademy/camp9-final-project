import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';
import { IoCheckmark } from 'react-icons/io5';

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
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    icon: (
      <h3>
        Vote
        <IoCheckmark />
      </h3>
    ),
    dateInput: new Date('2023-06-15T00:00:00'),
  },
};

export const Pending: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-15T00:00:00'),
  },
};

export const Closed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-01T00:00:00'),
  },
};

export const OwnOpen: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-15T00:00:00'),
  },
};

export const OwnClosed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: new Date('2023-06-01T00:00:00'),
  },
};
