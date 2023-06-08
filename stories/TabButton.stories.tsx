import { Meta, StoryObj } from '@storybook/react';
import TabButton from '../components/shared/buttons/TabButton';

const meta: Meta<typeof TabButton> = {
  title: 'TabButton',
  component: TabButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TabButton>;

export const Default: Story = {
  args: {
    children: 'Tab Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Tab Button',
    disabled: true,
  },
};

export const New: Story = {
  args: {
    children: 'New',
  },
};
