import type { Meta, StoryObj } from '@storybook/react';

import BoxChecked from '../components/Checkbox';

const meta: Meta<typeof BoxChecked> = {
  title: 'Example/Question',
  component: BoxChecked,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BoxChecked>;

export const Checkbox: Story = {
  args: {
    BoxChecked: { color },
  },
};
