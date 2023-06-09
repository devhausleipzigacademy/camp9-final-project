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
    children: 'button',
  },
};

export const Inactive: Story = {
  args: {
    children: 'button',
    inactive: true,
  },
};

export const New: Story = {
  args: {
    children: 'new',
  },
};

export const NewDisabled: Story = {
  args: {
    children: 'new',
    inactive: true,
  },
};

export const Pending: Story = {
  args: {
    children: 'pending',
  },
};

export const PendingDisabled: Story = {
  args: {
    children: 'pending',
    inactive: true,
  },
};

export const Closed: Story = {
  args: {
    children: 'closed',
  },
};

export const ClosedDisabled: Story = {
  args: {
    children: 'closed',
    inactive: true,
  },
};

// my polls
export const MyPolls: Story = {
  args: {
    children: 'my polls',
  },
};

export const MyPollsDisabled: Story = {
  args: {
    children: 'my polls',
    inactive: true,
  },
};
