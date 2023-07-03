import MoodDisplay from '@/components/MoodDisplay';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MoodDisplay> = {
  title: 'components/Mood Display',
  component: MoodDisplay,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MoodDisplay>;

export const Sad: Story = {
  args: {
    averageMood: 0.6,
  },
};

export const Happy: Story = {
  args: {
    averageMood: 3.3,
  },
};

export const None: Story = {
  args: {
    averageMood: -1,
  },
};
