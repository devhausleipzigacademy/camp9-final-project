import type { Meta, StoryObj } from '@storybook/react';
import PollDetailsCard from '../components/PollDetailsCard';

const meta: Meta<typeof PollDetailsCard> = {
  title: 'Example/Poll Details Card',
  component: PollDetailsCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PollDetailsCard>;

export const WithoutNote: Story = {
  args: {
    title: 'Poll details card title',
    children: 'Poll details card description',
  },
};

export const WithNote: Story = {
  args: {
    title: 'Poll details card title',
    children: 'Poll details card description',
    note: 'A special note about the card contents',
  },
};
