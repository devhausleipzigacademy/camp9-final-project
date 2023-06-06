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
    question: 'Lorem ipsum dolor sit amet, consectetur?',
    open: true,
    voted: false,
  },
};
