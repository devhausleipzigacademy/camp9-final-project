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

export const Disabled: Story = {
  args: {
    children: 'button',
    disabled: true,
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
    disabled: true,
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
    disabled: true,
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
    disabled: true,
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
    disabled: true,
  },
};
