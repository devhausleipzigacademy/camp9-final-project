import { Meta, StoryObj } from '@storybook/react';

import PollCard from '../components/PollCard';
import { HiArrowUpRight } from 'react-icons/hi2';
import { faker } from '@faker-js/faker';
import { HiCheck } from 'react-icons/hi2';

const meta: Meta<typeof PollCard> = {
  title: 'PollCard',
  component: PollCard,
  tags: ['autodocs'],
  argTypes: {
    dateInput: {
      control: 'date',
    },
    icon: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PollCard>;

export const New: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: faker.date.future(),
    href: '/new',
    icon: (
      <>
        <h3>Vote</h3>
        <HiArrowUpRight strokeWidth={1} />
      </>
    ),
  },
};

export const Pending: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: faker.date.future(),
    href: '/details',
    icon: (
      <>
        <h3>Voted</h3>
        <HiCheck strokeWidth={1} />
      </>
    ),
  },
};

export const Closed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: faker.date.past(),
    href: '/results',
    icon: (
      <>
        <h3>See Results</h3>
        <HiArrowUpRight strokeWidth={1} />
      </>
    ),
  },
};

export const OwnOpen: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: faker.date.future(),
    href: '/details',
  },
};

export const OwnClosed: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur?',
    dateInput: faker.date.past(),
    
  },
};
