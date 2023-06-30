import MoodDisplay from '@/components/MoodDIsplay';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MoodDisplay> = {
  title: 'components/Mood Display',
  component: MoodDisplay,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MoodDisplay>;

export const Default = {
  args: {},
};
