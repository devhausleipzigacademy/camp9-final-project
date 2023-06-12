import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
  tags: ['autodocs'],
  argTypes: {
    endDate: {
      control: 'date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PollCard>;

export const New: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    endDate: faker.date.future(),
    isVoted: false,
  },
};

export const Pending: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    endDate: faker.date.future(),
    isVoted: true,
  },
};

export const Closed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    endDate: faker.date.past(),
    isVoted: true,
  },
};

export const OwnOpen: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    endDate: faker.date.future(),
  },
};

export const OwnClosed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    endDate: faker.date.past(),
  },
};
